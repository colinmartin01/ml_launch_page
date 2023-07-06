USE ROLE AIML_ROLE;
USE DATABASE AIML_DB;
USE SCHEMA AIML_DEV;

put file://C:\GitHub_Local_Repository\AIML\AppsAssoc_DEV_DataGen_002_Python-Faker\data_results\base\ITEMS_base.csv @my_csv_stage auto_compress=true;

create or replace table stg_ss_items copy grants (
  Business varchar(100),
  Brand varchar(100),
  Product_Family varchar(100),
  Item varchar(100)
);

copy into AIML_DB.AIML_DEV.STG_SS_ITEMS
  from @my_csv_stage/ITEMS_base.csv.gz
  file_format = (format_name = FF_CSV_FORMAT)
  on_error = 'skip_file';