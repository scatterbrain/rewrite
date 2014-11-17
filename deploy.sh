#/bin/bash

docker build -t scatterbrain/rewrite . && docker push scatterbrain/rewrite && ansible-playbook -i ../devops/ansible/rewrite/hosts ../devops/ansible/rewrite/site.yml
