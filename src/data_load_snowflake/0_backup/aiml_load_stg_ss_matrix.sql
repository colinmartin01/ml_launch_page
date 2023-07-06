USE ROLE AIML_ROLE;
USE DATABASE AIML_DB;
USE SCHEMA AIML_DEV;

put file://C:\GitHub_Local_Repository\AIML\AppsAssoc_DEV_DataGen_002_Python-Faker\data_results\base\MATRIX_base.csv @my_csv_stage auto_compress=true;

create or replace table stg_ss_matrix copy grants (
  Item varchar(100),
  Location varchar(100),
  Status varchar(100),
  LifeCycle varchar(100),
  TrendNPI varchar(100),
  TrendCORE varchar(100),
  TrendEOL varchar(100),
  DateNPI date,
  DateCORE date,
  DateEOL date,
  SafetyStockType varchar(100),
  InitialSafetyStockValue number(38,0)
);

copy into AIML_DB.AIML_DEV.STG_SS_MATRIX
  from @my_csv_stage/MATRIX_base.csv.gz
  file_format = (format_name = FF_CSV_FORMAT)
  on_error = 'skip_file';