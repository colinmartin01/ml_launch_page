
from contextlib import closing
import datetime as dt
import fnmatch
import io
import re
from typing import List

import boto3
from botocore.exceptions import ClientError
import snowflake.connector
import pandas as pd
import pandas.io.sql as psql


class SnowflakeExecutor:
    """
    Class for executing queries in Snowflake Database.

    Attributes:
        username (str): Snowflake username for login.
        password (str): Snowflake password for login.
        account (str): Snowflake account name.
        role (str): Snowflake role to use.
        warehouse (str): Snowflake warehouse to use.
        database (str): Default Snowflake database to use.
        schema (str): Default Snowflake schema to use.
    """
    def __init__(
            self, username=None, password=None, account=None, role=None,
            warehouse=None, database=None, schema=None):
        self.username = username
        self.password = password
        self.account = account
        self.role = role
        self.warehouse = warehouse
        self.database = database
        self.schema = schema

    @staticmethod
    def _get_sql(sql_path, sql_txt, sql_params=None):
        """ Reads sql to execute.

        Args:
            sql_path (str): location of sql file to open.
            sql_txt (str): sql string to execute.

        Returns:
            string with sql parameters populated
        """
        if sql_params:
            if sql_txt:
                return sql_txt.format(**sql_params)

            else:
                with closing(open(sql_path, 'r')) as fd:
                    sql_txt = fd.read()
                    return sql_txt.format(**sql_params)

        else:
            if sql_txt:
                return sql_txt

            else:
                with closing(open(sql_path, 'r')) as fd:
                    sql_txt = fd.read()
                    return sql_txt

    @staticmethod
    def _split_sql(sql_txt):
        """ Splits sql text into individual queries.

        Args:
            sql_txt (str): sql string to execute.

        Returns:
            list of sql queries to execute.
        """
        if sql_txt.count(';') > 1:
            return [x.strip() for x in sql_txt.split(';')[:-1]]

        else:
            return [sql_txt]

    def _get_conn(self):
        """ Set up connection cursor for Snowflake.

        Returns:
            cursor for executing queries against Snowflake.
        """
        params = dict(
            user=self.username,
            password=self.password,
            account=self.account,
            warehouse=self.warehouse,
            database=self.database,
            schema=self.schema,
            role=self.role,
            insecure_mode=True)

        return snowflake.connector.connect(**params)


    def _check_fail_statement(self, first_row, fail_statements, query):
        """
        Check that the returned value is not a passed fail statement
        """
        return_value = str(first_row[0])

        fail_statements = [fail_statements] if isinstance(
            fail_statements, str) else fail_statements

        if return_value in fail_statements:
            message = 'The following SQL exhibited a "fail statement"' \
                      ' during execution.\n' \
                      'Fail Statement: {f}\n' \
                      'SQL: {s}'.format(
                       f=fail_statements, s=query)
            raise Exception(message)

    def execute(self, sql_path=None, sql_txt=None, sql_params=None,
                snowflake_parameters=None, fail_statements=None, file=None):
        """ Executes sql in Snowflake. Must pass either the sql path or
                sql text directly.

        Args:
            sql_path (str): location of sql file to open.
            sql_txt (str): sql string to execute.
            sql_params (dict): set of parameters to add to sql text.
            snowflake_parameters (dict): Snowflake parameters to render
                SQL query with.
            fail_statement (str or list): check if load failed based on
                return value
        """
        sql_comp = self._get_sql(sql_path, sql_txt, sql_params)
        sql = self._split_sql(sql_comp)

        with closing(self._get_conn()) as conn:
            with closing(conn.cursor()) as cs:
                for query in sql:
                    #if query == "SET filename = 'file'":
                    #    query = "SET filename = " + "'" + file + "'"
                    print('Executing: {sql}'.format(sql=query))
                    cs.execute(query, snowflake_parameters)

                    print('Field(s): ' + ','.join(
                        [col[0] for col in cs.description]))
                    first_row = cs.fetchone()
                    print('First Row: ' + ','.join(map(str, first_row)))

                    if fail_statements:
                        self._check_fail_statement(
                            first_row, fail_statements, query)

