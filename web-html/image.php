<?php
create();
function create()
{
        $file = "";
        if (isset($_GET['f']))
            $file = $_GET['f'];
        $filter ="";
        if (isset($_GET['filter']))
            $filter = $_GET['filter'];

        $modified = time();

        if ($file == "" || !file_exists($file))
            $file = "img/baselope.png";
        else
            $modified = filemtime($file);
        $alt = filemtime("image.php");
        if ($alt > $modified)
            $modified = $alt;
        //Check caching
        $offset = 60 * 60 * 24 * 31; // Cache for 2 weeks
        $imagetype = exif_imagetype($file);
        $mimetype = image_type_to_mime_type($imagetype);

        //header("Cache-Control: private, max-age=10800, pre-check=10800");
        //header("Pragma: private");
        //header ('Expires: ' . gmdate ("D, d M Y H:i:s", time() + $offset) . ' GMT');
        if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $modified)
        {
            header('Last-Modified: '.gmdate('D, d M Y H:i:s', $modified).' GMT',true, 304);
            exit();
        }
        if ($filter != "")
        {
            switch($imagetype)
            {
                case IMAGETYPE_GIF:
                    $im = imagecreatefromgif($file);
                    break;
                case IMAGETYPE_JPEG:
                    $im = imagecreatefromjpeg($file);
                    break;
                case IMAGETYPE_PNG:
                    $im = imagecreatefrompng($file);
                    imagealphablending($im, true); // setting alpha blending on
                    imagesavealpha($im, true); // save alphablending setting (important)
                    break;
            }
            if ($filter == "gray")
                imagefilter($im, IMG_FILTER_GRAYSCALE);
            else if($filter == "neg")
                imagefilter($im, IMG_FILTER_NEGATE);

            else if ($filter== "sepia")
            {
                imagefilter($im, IMG_FILTER_GRAYSCALE);
                imagefilter($im, IMG_FILTER_COLORIZE, -32, -32, -64);
            }

            header("Content-type: ".$mimetype);
            header ("Last-Modified: ".gmdate("D, d M Y H:i:s", $modified )." GMT");
            switch($imagetype)
            {
                case IMAGETYPE_GIF:
                    imagegif($im);
                    break;
                case IMAGETYPE_JPEG:
                    imagejpeg($im);
                    break;
                case IMAGETYPE_PNG:
                    imagepng($im);
                    break;
            }
            imagedestroy($im);
            exit();
        }
        header("Content-type: ".$mimetype);
        header ("Last-Modified: ".gmdate("D, d M Y H:i:s", $modified )." GMT",true,200);
        readfile($file);
}
function imagetograyscale($im)
{
    if (imageistruecolor($im)) {
        imagetruecolortopalette($im, false, 256);
    }

    for ($c = 0; $c < imagecolorstotal($im); $c++) {
        $col = imagecolorsforindex($im, $c);
        $gray = round(0.299 * $col['red'] + 0.587 * $col['green'] + 0.114 * $col['blue']);
        imagecolorset($im, $c, $gray, $gray, $gray);
    }
}
?>