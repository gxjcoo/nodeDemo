# #!/bin/bash
# set -e
# #脚本所在路径
# root_path=$(
#   cd $(dirname $0)
#   pwd
# )
# cd $root_path

# #$1 待解压文件的路径

# rm -rf extract
# mkdir extract
# packer/packer -in $1 decode -out extract/out.tar.gz -prikey packer/pri.key
# cd extract
# tar xvf out.tar.gz
