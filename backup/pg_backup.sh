#!/bin/bash
DATE=$(date +%Y-%m-%d)
pg_dump -U marketplace -h localhost marketplace > /tmp/marketplace_backup_$DATE.sql
aws s3 cp /tmp/marketplace_backup_$DATE.sql s3://your-bucket/backups/
rm /tmp/marketplace_backup_$DATE.sql
