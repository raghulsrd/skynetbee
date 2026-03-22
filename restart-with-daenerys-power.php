<?php
// Execute the command to restart Apache
$output = shell_exec('sudo systemctl restart apache2');

if ($output === null) {
    echo "Apache restarted successfully!";
} else {
    echo "Error restarting Apache: $output";
}
?>