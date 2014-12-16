<?php
header("Content-Type: text/html; charset=utf-8");
require_once 'php/faker/autoload.php';
$faker = Faker\Factory::create('olli');
$faker->realTextInit('_assets/text/anhalter.txt');
/*Ü*/
function pageheader()
{
  $html = "";
  $html.= "<header class='header page-row text-center' fwb='true'>";
  $html.=   "<div id='hcx' class='header-cell hidden'>".hamburger()."</div>";
  $html.=   "<div id='hc0' class='header-cell'>".logo()."</div>";
  $html.=   "<div id='hc1' class='header-cell'>".menu()."</div>";
  $html.=   "<div id='hc2' class='header-cell'>".tools()."</div>";
  $html.=   "<div id='hc3' class='header-cell header-cell-search'>".searchbar()."</div>";
  $html.=   "<div id='contact' class='header-cell space hidden'><button toggle='#contactbar' class='tool tool-contact'><i class='icon-contact'></i></button></div>";
  $html.=   "<div id='search'  class='header-cell space hidden'><button toggle='#searchbar' class='tool tool-search'><i>S</i></button></div>";
  $html.=   "<div id='contactbar' class='header-bar header-bar-contact hidden' fwb='true'>";
  $html.=      "<button toggle='#contactbar' class='tool tool-back'><i>&lt;</i></button>".tools();
  $html.=   "</div>";
  $html.=   "<div id='searchbar' class='header-bar header-bar-search hidden' fwb='true'>";
  $html.=      "<button toggle='#searchbar' class='tool tool-back'><i>&lt;</i></button>".searchbar();
  $html.=   "</div>";
  $html.= "</header>";
  return $html;
}
function menu()
{
  $html = "";
  $html.=  "<nav class='mainmenu menu'>";
  $html.=    "<ul>";
  $html.=      "<li style='z-index:100'><a href='#'>Link1</a></li>";
  $html.=      "<li style='z-index:99' class='hassub'><a href='template2.html'>Link2<i class='icon-small' aria-hidden='true'>+</i></a><b aria-haspopup='true'  aria-controls='m1' ></b>";
  $html.=        "<ul id='m1'>";
  $html.=          "<li><a href='#'>Sub1</a></li>";
  $html.=          "<li><a href='#'>Sub2</a></li>";
  $html.=          "<li><a href='#'>Sub3 ganz furchtbar lang</a></li>";
  $html.=        "</ul>";
  $html.=      "</li>";
  $html.=      "<li style='z-index:98' class='hassub'><a href='template3.html'>Link3<i class='icon-small' aria-hidden='true'>+</i></a><b aria-haspopup='true'  aria-controls='m2' ></b>";
  $html.=        "<ul id='m2'>";
  $html.=          "<li><a href='#'>Sub1</a></li>";
  $html.=          "<li><a href='#'>Sub2</a></li>";
  $html.=          "<li><a href='#'>Sub3</a></li>";
  $html.=          "<li><a href='#'>Sub4</a></li>";
  $html.=          "<li><a href='#'>Sub5</a></li>";
  $html.=        "</ul>";
  $html.=      "</li>";
  $html.=      "<li style='z-index:97'><a href='#'>Link4</a></li>";
  $html.=      "<li style='z-index:96'><a href='#'>Link5</a></li>";
  $html.=    "</ul>";
  $html.=  "</nav>";
  return $html;
}
function sidemenu()
{
  $html = "";
  $html.=  "<aside id='sidemenu' class='sidemenu hidden'>";
  $html.=    "<ul>";
  $html.=      "<li><a href='#'>Link1</a></li>";
  $html.=      "<li><button menu-open='m1'>Submenu1</button>";
  $html.=        "<ul id='m1'>";
  $html.=          "<li><button  menu-close='m1'>Back</button></li>";
  $html.=          "<li><a href='#'>Sub1</a></li>";
  $html.=          "<li><a href='#'>Sub2</a></li>";
  $html.=          "<li><a href='#'>Sub3 ganz furchtbar lang</a></li>";
  $html.=        "</ul>";
  $html.=      "</li>";
  $html.=      "<li><button  menu-open='m2'>Submenu2</button>";
  $html.=        "<ul id='m2'>";
  $html.=          "<li><button menu-close='m2'>Back</button></li>";
  $html.=          "<li><a href='#'>Sub1</a></li>";
  $html.=          "<li><a href='#'>Sub2</a></li>";
  $html.=          "<li><a href='#'>Sub3</a></li>";
  $html.=          "<li><a href='#'>Sub4</a></li>";
  $html.=          "<li><a href='#'>Sub5</a></li>";
  $html.=        "</ul>";
  $html.=      "</li>";
  $html.=      "<li><a href='#'>Link4</a></li>";
  $html.=      "<li><a href='#'>Link5</a></li>";
  $html.=    "</ul>";
  $html.=  "</aside>";
  return $html;
}
function logo()
{
  $html = "";
  $html.= "<a class='header-logo' href='#' title='Ollis LAB'>";
  $html.=   "<i>Ollis lab</i>";
  $html.= "</a>";
  return $html;
}
function hamburger()
{
  $html = "";
  $html.= "<button class='tool tool-hamburger' toggle='#sidemenu'>";
  $html.= "<i>menU</i>";
  $html.= "</button>";
  return $html;
}
function searchbar()
{
  $html = "";
  $html.=   "<form  action='search.php' onsubmit='alert(\"Searching\");return false;' method='post' name='SearchBoxForm'>";
  $html.=     "<input type='search' value='' name='search' placeholder='Suchen...'>";
  $html.=     "<button class='tool tool-search' type='submit'><i>Search</i></button>";
  $html.=   "</form>";
  return $html;
}
function tools()
{
  $html = "";
  $html.= "<ul class='header-tools'>";
  $html.= "<li>".hamburger()."</li>";
  $html.= "<li><button toggle='#searchbar' class='tool tool-search'><i>S</i></button></li>";
  $html.= "<li><a href='#' class='tool'><i>eMail</i></a></li>";
  $html.= "<li><a href='#' class='tool'><i>gitHub</i></a></li>";
  $html.= "<li><a href='#' class='tool'><i>Googleplus</i></a></li>";
  $html.= "<li><a href='#' class='tool'><i>Facebook</i></a></li>";
  $html.= "<li><a href='#' class='tool'><i>Twitter</i></a></li>";
  //$html.= "  <li class='header-tools-search'>".searchbox(false)."</li>";
  //$html.= "  <li class='header-tools-search'>".searchbox(false)."</li>";
  $html.= "</ul>";
  return $html;
}
header("Content-Type: text/html; charset=utf-8");
?>
<!DOCTYPE HTML>
<!--[if lte IE 7]><html lang='de' class="no-js ie ie-old"> <![endif]-->
<!--[if IE 8]><html lang='de' class="no-js ie ie-8"> <![endif]-->
<!--[if IE 9]><html lang='de' class="no-js ie ie-9"> <![endif]-->
<!--[if !IE]>-->
<html  lang='de' class="no-js no-ie">
<!--<![endif]-->
<head>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
  <meta charset='utf-8'/>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=yes'>
  <meta name='format-detection' content='telephone=no'/>
  <title>Olli's Lab</title>
  <script src="_assets/js/kickstart/html5shiv.js"></script>
  <script src="_assets/js/esential/webfontloader.js"></script>
  <script src="_assets/js/esential/modernizr-custom.js"></script>
  <link rel="stylesheet" type="text/css" href="css/page.css">
  <style type="text/css">
  <!--
  -->
  </style>
</head>

<body class='page'>
<?php echo pageheader();?>
    <div id='content' role="main" class='page-row page-row-expanded content' fwb='true'>
    <article>
        <h1>Ollis Seite</h1>
        <h2>for internal use only...</h2>
<?php
        for ($i=0;$i<1;$i++)
        {
            echo "<h2>".$faker->catchPhrase."</h2>";
            for ($j=0;$j<$faker->numberBetween(1,5);$j++)
                echo "<p>".$faker->realText($faker->numberBetween(200,1200),2)."</p>";
        }
?>

    </article>
    </div>

<footer class='footer page-row' fbw='fwb'><ul><li>Made with care by Olli</li><li>&copy; 2014 by Oliver Jean Eifler</li></ul></footer>
<?php echo sidemenu();?>
<script src="_assets/js/jquery/jquery-1.11.1.js"></script>
<script src="_assets/js/jquery/jquery.onfontresize.js"></script>
<script src="_assets/js/components/velocity.js"></script>
<script src="_assets/js/olli/olli.js"></script>
<script src="_assets/js/page/header.js"></script>
<script src="_assets/js/page/footer.js"></script>
<script src="_assets/js/page/sidemenu.js"></script>
<script src="_assets/js/page.js"></script>
<script>
  if (checkBrowser())
    olli.page.init();
  function checkBrowser()
  {
    return (Modernizr.csstransforms && (Modernizr.flexbox ||Modernizr.flexboxlegacy || Modernizr.flexboxtweener));
  }

</script>
</body>
</html>