#!/bin/bash

#!alias k=kubectl

for $component in `ls ync-app/*.yml`; do k delete -f ${component}; done
for $component in `ls ync-api/*.yml`; do k delete -f ${component}; done
for $component in `ls ync-database/*.yml`; do k delete -f ${component}; done
kubectl delete namespace ync-app
