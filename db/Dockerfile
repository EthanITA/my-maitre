FROM redgate/flyway:9.19.4

# Switch to root user to install packages
USER root

# Install gettext package for envsubst command
RUN apt-get update && \
    apt-get install -y gettext-base && \
    rm -rf /var/lib/apt/lists/*

# Copy the SQL scripts
COPY sql /flyway/sql

# Copy the Flyway configuration file (as a template)
COPY flyway.conf /flyway/conf/flyway.conf.template

# Copy the entrypoint script
COPY entrypoint.sh /flyway/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /flyway/entrypoint.sh

ENTRYPOINT ["/flyway/entrypoint.sh"]
