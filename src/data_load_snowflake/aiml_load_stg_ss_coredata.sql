USE ROLE AIML_ROLE;
USE DATABASE AIML_DB;
USE SCHEMA AIML_DEV;

create or replace table stg_ss_coredata copy grants (
  Period date,
  Item varchar(100),
  Location varchar(100),
  Orders_Complete number(38,0),
  Orders_Open number(38,0),
  Orders_Canceled number(38,0),
  Orders_Returned number(38,0),
  Forecast01 number(38,0),
  Forecast02 number(38,0),
  Forecast03 number(38,0),
  Inventory_starting number(38,0),
  Inventory_capacity number(38,0),
  Inventory_production number(38,0),
  Inventory_end number(38,0),
  SafetyStock01 number(38,6),
  SafetyStock02 number(38,6),
  Net_Requirement number(38,6),
  Outcome01 varchar(100),
  Outcome02 varchar(100),
  Outcome03 varchar(100),
  Trend_type varchar(100),
  Trend_factor1 varchar(100),
  Trend_factor2 varchar(100),
  Trend_factor3 varchar(100),
  Trend_factor4 varchar(100),
  Trend_factor5 varchar(100),
  Last_Period   varchar(100),
  Last_X_Value	varchar(100),
  Last_Y_Value	varchar(100)
);

put file://C:\GitHub_Local_Repository\AIML\AppsAssoc_DEV_DataGen_002_Python-Faker\data_results\base\COREDATA2_base.csv @my_csv_stage auto_compress=true;


copy into AIML_DB.AIML_DEV.STG_SS_COREDATA
  from @my_csv_stage/COREDATA2_base.csv.gz
  file_format = (format_name = FF_CSV_FORMAT)
  on_error = 'skip_file';