#
# Cookbook Name:: node_oracledb
# Recipe:: default
#
# Copyright (c) 2015 The Authors, All Rights Reserved.

package 'libaio1' 
package 'unzip' 
package 'build-essential' 

directory '/opt/oracle' do
  owner 'root'
  group 'root'
  mode '0755'
  action :create
end

cookbook_file '/opt/oracle/instantclient-basic-linux.x64-12.1.0.2.0.zip' do
  source 'instantclient-basic-linux.x64-12.1.0.2.0.zip'
  owner 'root'
  group 'root'
  mode '0644'
end

cookbook_file '/opt/oracle/instantclient-sdk-linux.x64-12.1.0.2.0.zip' do
  source 'instantclient-sdk-linux.x64-12.1.0.2.0.zip'
  owner 'root'
  group 'root'
  mode '0644'
end

cookbook_file '/etc/init/oracle-api-service.conf' do
  source 'oracle-api-service.conf'
  owner 'root'
  group 'root'
  mode '0644'
end

execute 'unzip_instantclient_sdk' do
  command 'unzip instantclient-sdk-linux.x64-12.1.0.2.0.zip'
  cwd '/opt/oracle'
  not_if { Dir.exists?("/opt/oracle/instantclient") }
end

execute 'unzip_instantclient_basic' do
  command 'unzip instantclient-basic-linux.x64-12.1.0.2.0.zip'
  cwd '/opt/oracle'
  not_if { Dir.exists?("/opt/oracle/instantclient") }
end

execute 'rename_to_instantclient' do
  command 'mv instantclient_12_1 instantclient'
  cwd '/opt/oracle'
  not_if { Dir.exists?("/opt/oracle/instantclient") }
end

link '/opt/oracle/instantclient/libclntsh.so' do
  to 'libclntsh.so.12.1' 
end

template '/home/vagrant/.bash_aliases' do
  source 'bash_aliases.erb'
  owner 'root'
  group 'root'
  mode '0644'
end

bash "export_LD_LIBRARY_PATH_OCI_LIB_DIR" do
  code <<-EOF
   export LD_LIBRARY_PATH=/opt/oracle/instantclient
   export OCI_LIB_DIR=/opt/oracle/instantclient
   export OCI_INC_DIR=/opt/oracle/instantclient/sdk/include
EOF
end

bash "npm_install_oracledb" do
  not_if { Dir.exists?("/vagrant/oracle-api/node_modules") }
  code <<-EOF
   cd /vagrant/oracle-api
   npm install
EOF
end

# execute 'name' do
#   command 'forever start index.js'
#   creates '/tmp/something'
#   action :run
# end
