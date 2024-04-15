#!/bin/bash

sed -i 's/\r$//' deployment/start.sh
sed -i 's/\r$//' deployment/shutdown.sh

sed -i 's/\r$//' ync-database/start.sh
sed -i 's/\r$//' ync-database/shutdown.sh
