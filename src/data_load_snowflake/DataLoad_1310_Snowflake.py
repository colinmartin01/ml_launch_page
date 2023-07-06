import os
import sys
from common_services import SnowflakeExecutor
from dotenv import load_dotenv

load_dotenv()

def load_data(snowflake, sql_path):
    snowflake.execute(sql_path)

def cli():
    snowflake = SnowflakeExecutor(
        username=os.environ['SNOWFLAKE_USERNAME'],
        password=os.environ['SNOWFLAKE_PASSWORD'],
        account=os.environ['SNOWFLAKE_ACCOUNT'],
        warehouse=os.environ['SNOWFLAKE_WAREHOUSE'],
        role=os.environ['SNOWFLAKE_ROLE'],
        database=os.environ['SNOWFLAKE_DATABASE'])
    try:
        #Locations Data Load
        sql_path='aiml_load_stg_ss_locations.sql'
        snowflake.execute(sql_path)

        #Items Data Load
        sql_path='aiml_load_stg_ss_items.sql'
        snowflake.execute(sql_path)

        #Matrix Data Load
        sql_path='aiml_load_stg_ss_matrix.sql'
        snowflake.execute(sql_path)

        #Core Data Load
        sql_path='aiml_load_stg_ss_coredata.sql'
        snowflake.execute(sql_path)
    except Exception as e:
        raise e

if __name__ == '__main__':
    cli()
