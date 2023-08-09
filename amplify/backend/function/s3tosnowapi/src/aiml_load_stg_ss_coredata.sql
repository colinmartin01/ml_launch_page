USE ROLE AIML_ROLE;
USE DATABASE AIML_DB;
USE SCHEMA AIML_DEV;
SET filename = 'file';

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

create or replace file format col_mismatch
  skip_header = 1
  error_on_column_count_mismatch = false;

copy into AIML_DB.AIML_DEV.STG_SS_COREDATA_AGG
  from s3://mllaunchbucket114641-dev/public credentials=(AWS_KEY_ID='AKIAVLW57Z3HLJU43FUH' AWS_SECRET_KEY='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')
  --pattern = filename
  --files = [2023-06-19 8_44am_csv.csv]
  force = true
  file_format = col_mismatch
  on_error = 'skip_file';