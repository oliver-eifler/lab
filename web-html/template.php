<?php
header("Content-Type: text/html; charset=utf-8");
require_once 'php/faker/autoload.php';
$faker = Faker\Factory::create('olli');
$faker->realTextInit('_assets/text/anhalter.txt');
/*Ü*/
function pageheader()
{
  $html = "";
  $html.="<div id='header-wrapper'>";
  $html.= "<header id='header' class='widget header' fwb='true'>";
  $html.=   "<div id='hcx' class='header-cell' data-hide='true'>".hamburger()."</div>";
  $html.=   "<div id='hc0' class='header-cell'>".logo()."</div>";
  $html.=   "<div id='hc1' class='header-cell'>".menu()."</div>";
  $html.=   "<div id='hc2' class='header-cell'>".tools()."</div>";
  $html.=   "<div id='hc3' class='header-cell header-cell-search'>".searchbar()."</div>";
  $html.=   "<div id='contact' class='header-cell space' data-hide='true'><button data-toggle='#contactbar' class='tool tool-contact'><i>Contact</i></button></div>";
  $html.=   "<div id='search'  class='header-cell space' data-hide='true'><button data-toggle='#searchbar' class='tool tool-search'><i>Search</i></button></div>";
  $html.=   "<div id='contactbar' class='header-bar header-bar-contact' data-hide='true' fwb='true'>";
  $html.=      "<button data-toggle='#contactbar' class='tool tool-back'><i>&lt;</i></button>".tools();
  $html.=   "</div>";
  $html.=   "<div id='searchbar' class='header-bar header-bar-search' data-hide='true' fwb='true'>";
  $html.=      "<button data-toggle='#searchbar' class='tool tool-back'><i>&lt;</i></button>".searchbar();
  $html.=   "</div>";
  $html.= "</header>";
  $html.="</div>";
  $html.="<div id='gap'></div>";
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
  $html.=  "<div class='widget page-overlay' data-hide='true'>";
  $html.=  "<div id='sidepanel' class='sidepanel'>";
  $html.=    "<div class='sidepanel-bar'>";
  $html.=      "<button class='tool tool-back'><i>&lt;</i></button><div class='title'><i>Lab</i> Menu</div>";
  $html.=    "</div>";
  $html.=    "<ul class='sidepanel-menu'>";
  $html.=      "<li><a href='#'>Link1</a></li>";
  $html.=      "<li><button data-toggle='#spanel1'>Submenu1</button>";
  $html.=        "<ul id='spanel1'>";
  $html.=          "<li><a href='#'>Sub1</a></li>";
  $html.=          "<li><a href='#'>Sub2</a></li>";
  $html.=          "<li><a href='#'>Sub3 ganz furchtbar lang</a></li>";
  $html.=        "</ul>";
  $html.=      "</li>";
  $html.=      "<li><button data-toggle='#spanel2'>Submenu2</button>";
  $html.=        "<ul id='spanel2'>";
  $html.=          "<li><a href='#'>Sub1</a></li>";
  $html.=          "<li><a href='#'>Sub2</a></li>";
  $html.=          "<li><a href='#'>Sub3</a></li>";
  $html.=          "<li><a href='#'>Sub4</a></li>";
  $html.=          "<li><a href='#'>Sub5</a></li>";
  $html.=        "</ul>";
  $html.=      "</li>";
  $html.=      "<li><a href='#'>Link4</a></li>";
  $html.=      "<li><a href='#'>Link5</a></li>";
  $html.=      "<li><button data-toggle='#spanel3'>Extra...</button>";
  $html.=        "<ul id='spanel3'>";
  $html.=          "<li><a href='#'>Sub1</a></li>";
  $html.=          "<li><a href='#'>Sub2</a></li>";
  $html.=          "<li><a href='#'>Sub3</a></li>";
  $html.=          "<li><a href='#'>Sub4</a></li>";
  $html.=          "<li><a href='#'>Sub5</a></li>";
  $html.=          "<li><a href='#'>xSub1</a></li>";
  $html.=          "<li><a href='#'>xSub2</a></li>";
  $html.=          "<li><a href='#'>xSub3</a></li>";
  $html.=          "<li><a href='#'>xSub4</a></li>";
  $html.=          "<li><a href='#'>xSub5</a></li>";
  $html.=        "</ul>";
  $html.=      "</li>";
  $html.=      "<li><a href='#'>Link6</a></li>";
  $html.=    "</ul>";
  $html.=  "</div>";
  $html.=  "</div>";
  return $html;
}
function logo()
{
  $html = "";
  $html.= "<a class='tool tool-logo' href='#' title='Ollis LAB'>";
  $html.=   "<i>Ollis lab</i>";
  $html.= "</a>";
  return $html;
}
function hamburger()
{
  $html = "";
  $html.= "<button class='tool tool-hamburger' data-toggle='#sidepanel'>";
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
  <script src="_assets/js/components/webfontloader.1.5.10.js"></script>
  <script src="_assets/js/esential/modernizr-custom.js"></script>
  <link rel="stylesheet" type="text/css" href="css/page.css">
  <style type="text/css">
  <!--
  -->
  </style>
</head>

<body class='page'>
<?php echo pageheader();?>
    <section class='hero50 pult'><div class='hero-wrapper'>
     <article>
      <h1 class='text-center large'>Ollis Seite</h1>
      <div class='hgroup grid'>
           <div class='big'>for internal use only...</div>
           <div><em>Natürlich bin ich verrückt, aber das heißt nicht, dass ich falsch liege. Ich bin verrückt aber nicht krank.</em></div>
      </div>
      </article></div>
    </section>
    <section id='content' role="main" class='page-row page-row-expanded content' fwb='true' grid='true'>
      <article>
       <ul class='hgroup vlist'>
         <li><?php echo hamburger();?></li>
         <li><button data-toggle='#searchbar' class='tool tool-search'><i>Search</i></button></li>
         <li><button data-toggle='#contactbar' class='tool tool-contact'><i>Contact</i></button></li>
       </ul>
     <h2>Color Table</h2>
     <div class='test test-1'></div>
     <div class='test test-2'></div>
     <div class='test test-3'></div>
     <div class='test test-4'></div>
     <div class='test test-5'></div>
     <div class='test test-6'></div>
     <?php
        for ($i=0;$i<1;$i++)
        {
            echo "<h2>".$faker->catchPhrase."</h2>";
            for ($j=0;$j<$faker->numberBetween(1,5);$j++)
                echo "<p>".$faker->realText($faker->numberBetween(200,1200),2)."</p>";
        }
?>
     </article>
    </section>
    <section class='hero welpe'><div class='hero-wrapper'>
     <article class='text-center'>
       <h1>C'mon ... Contact me</h1>
       <ul class='hgroup vlist'>
        <li><a href='#' class='tool'><i>eMail</i></a></li>
        <li><a href='#' class='tool'><i>gitHub</i></a></li>
        <li><a href='#' class='tool'><i>Googleplus</i></a></li>
        <li><a href='#' class='tool'><i>Facebook</i></a></li>
        <li><a href='#' class='tool'><i>Twitter</i></a></li>
      </ul>
      </article>
    </div></section>
<footer id='footer' class='widget footer page-row'><ul><li><?php echo hamburger();?></li><li><i class='icon-cool'></i> Made with care by Olli<br><small>Not recommended for or tested with IE < 10</small></li><li><em><i class='icon-invader'></i> for internal use only</em></li><li>&copy; 2014 by Oliver Jean Eifler</li></ul></footer>
<?php echo sidemenu();?>
<script src="_assets/js/components/fastclick.js"></script>
<script src="_assets/js/components/jquery.2.1.3.js"></script>
<script src="_assets/js/jquery/jquery.onfontresize.js"></script>
<script src="_assets/js/components/velocity.1.1.0.js"></script>
<script src="_assets/js/olli/olli.js"></script>
<script src="_assets/js/page/header.js"></script>
<script src="_assets/js/page/footer.js"></script>
<script src="_assets/js/page/sidemenu.js"></script>
<script src="_assets/js/page/content.js"></script>
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