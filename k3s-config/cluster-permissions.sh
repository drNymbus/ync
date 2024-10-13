#!/bin/bash
# Located in: /usr/local/bin/cluster-permissions.sh

# chown -R :k3s /var/lib/rancher
# chmod -R 660 /var/lib/rancher/

chown -R :k3s /run/k3s/

# chown -R :k3s /etc/rancher
# chmod -R 760 /etc/rancher/
# chmod -R 660 /etc/rancher/node/
# chmod 644 /etc/rancher/k3s/k3s.yaml