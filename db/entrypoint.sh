#!/bin/sh

# Substitute environment variables in flyway.conf
envsubst < /flyway/conf/flyway.conf.template > /flyway/conf/flyway.conf

# Run Flyway
/flyway/flyway migrate