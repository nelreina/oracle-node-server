# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure(2) do |config|
  config.vm.box = "puppetlabs/ubuntu-14.04-64-puppet" 
  
  config.proxy.http     = "http://192.168.201.6:8080"
  config.proxy.https    = "http://192.168.201.6:8080"
  config.proxy.no_proxy = "localhost,127.0.0.1,10.40.30.252,10.40.21.140"
  config.vm.network "forwarded_port", guest: 8081, host:8081


  config.vm.network "public_network"

  config.vm.provider "virtualbox" do |vb| 
    vb.memory = "2048" 
  end 
  
  config.vm.provision "chef_solo" do |chef| 
    chef.http_proxy  = "http://192.168.201.6:8080"
    chef.https_proxy = "http://192.168.201.6:8080"    
    chef.cookbooks_path = ["u:\\.chef\\cookbooks" , "cookbooks"] 
    chef.add_recipe "nodejs::nodejs_from_binary" 
    chef.add_recipe "nodejs::npm_packages" 
    chef.add_recipe "git" 
    chef.add_recipe "node_oracledb" 
    chef.add_recipe "timezone-ii" 
    chef.json = { 
      "tz" => "Europe/Amsterdam", 
      "nodejs" => { 
        "version" => "0.12.7" , 
        "binary" => { 
          "checksum" => { 
            "linux_x64" => "6a2b3077f293d17e2a1e6dba0297f761c9e981c255a2c82f329d4173acf9b9d5" 
          } 
        },
        "npm_packages" => [
          {"name" => "gulp"} ,
          {"name" => "forever"} ,
        ]
      } 
    } 
  end 


end
