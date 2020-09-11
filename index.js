const core = require('@actions/core')
const exec = require('child_process').exec

try {
  installPMD()
} catch (error) {
  core.setFailed(error.message)
}

function installPMD(){
  var download = 'wget https://github.com/pmd/pmd/releases/download/pmd_releases%2F6.27.0/pmd-bin-6.27.0.zip -P /tmp'
  var unzip = 'unzip /tmp/pmd-bin-6.27.0.zip -d /tmp'
  var mk = 'mkdir -p $HOME/pmd'
  var mbin = 'mkdir -p $HOME/bin'
  var mv = 'mv /tmp/pmd-bin-6.27.0/* $HOME/pmd'
  exec(download+' && '+unzip+' && '+mk+' && '+mv+' && '+mbin , function(error, stdout, stderr){
    if(error) core.setFailed(stderr)
    core.debug(stdout)
    referencePMD()
  })
}

function referencePMD(){
//  var jre = 'apt-get install default-jre'
  var cmd = 
`echo '#! /bin/bash
$HOME/pmd/bin/run.sh pmd "$@"' > $HOME/bin/pmd`
  var cm = 'chmod +x $HOME/bin/pmd'
  exec(cmd+' && '+cm, function(error, stdout, stderr){
    if(error) core.setFailed(stderr)
    core.debug(stdout)
  })
}
