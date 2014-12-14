<?php
$modified = time();
$error = true;
$file = 'src not set';
if (isset($_GET['f']))
{
    $file = $_GET['f'];
    if (file_exists($file))
    {
        $modified = filemtime($file);
        $error = false;
    }
    else
        $error = true;
}
$offset = 60 * 60 * 24 * 31; // Cache for 1 month
if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $modified)
{
    header('Last-Modified: '.gmdate('D, d M Y H:i:s', $modified).' GMT',true, 304);
}
else
{
	header('Content-type: image/svg+xml');    header ('Pragma:');
    header ("Last-Modified: ".gmdate("D, d M Y H:i:s", $modified )." GMT",true,200);
    if(!ob_start("ob_gzhandler"))
        ob_start();
        if (!$error)
            echo file_get_contents($file);
        else
            echo "file not found: ".$file;
        ob_end_flush();
}
exit();
?>