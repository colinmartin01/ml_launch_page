USE ROLE AIML_ROLE;
USE DATABASE AIML_DB;
USE SCHEMA AIML_DEV;

create or replace table stg_ss_locations copy grants (
  WorldRegion varchar(100),
  Country varchar(100),
  Region varchar(100),
  SubRegion varchar(100),
  ShipToLocation varchar(100)
);


put file://C:\GitHub_Local_Repository\AIML\AppsAssoc_DEV_DataGen_002_Python-Faker\data_results\base\LOCATIONS_base.csv @my_csv_stage auto_compress=true;


copy into AIML_DB.AIML_DEV.STG_SS_LOCATIONS
  from @my_csv_stage/LOCATIONS_base.csv.gz
  file_format = (format_name = FF_CSV_FORMAT)
  on_error = 'skip_file';