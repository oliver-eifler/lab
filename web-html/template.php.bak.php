<?php
function pageheader()
{
  $html = "";
  $html.= "<header class='header page-row text-center'>";
  $html.=   "<div id='hcx' class='header-cell hidden'>".hamburger()."</div>";
  $html.=   "<div id='hc0' class='header-cell'>".logo()."</div>";
  $html.=   "<div id='hc1' class='header-cell'>".menu()."</div>";
  $html.=   "<div id='hc2' class='header-cell'>".tools()."</div>";
  $html.=   "<div id='hc3' class='header-cell header-cell-search'>".searchbar()."</div>";
  $html.=   "<div id='contact' class='header-cell space hidden'><button toggle='#contactbar' class='tool tool-contact'><i class='icon-contact'></i></button></div>";
  $html.=   "<div id='search'  class='header-cell space hidden'><button toggle='#searchbar' class='tool tool-search'><i>S</i></button></div>";
  $html.=   "<div id='contactbar' class='header-bar header-bar-contact hidden'><button toggle='#contactbar' class='tool tool-back'><i>&lt;</i></button>".tools()."</div>";
  $html.=   "<div id='searchbar' class='header-bar header-bar-search hidden'><button toggle='#searchbar' class='tool tool-back'><i>&lt;</i></button>".searchbar()."</div>";
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
  $html.= "<a href='#' class='tool tool-hamburger'>";
  $html.= "<i>menU</i>";
  $html.= "</a>";
  return $html;
}
function searchbar()
{
  $html = "";
  $html.=   "<form  action='search.php' onsubmit='alert(\"Searching\");return false;' method='post' name='SearchBoxForm'>";
  $html.=     "<input type='search' value='' name='search' placeholder='Suchen...'>";
  $html.=     "<button class='tool tool-search' type='submit'><i>Search</i></button>";
  $html.=   "</form>";
  $html.= "</div>";

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
?>
<!DOCTYPE HTML>
<!--[if lte IE 7]><html lang='de' class="no-js ie ie-old"> <![endif]-->
<!--[if gte IE 8]><html lang='de' class="no-js ie ie-legacy"> <![endif]-->
<![if !IE]>
<html  lang='de' class="no-js no-ie">
<![endif]>
<head>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
  <meta charset='utf-8'/>
  <meta content='content-type' content='text/html; charset=utf-8'/>
  <meta http-equiv='content-type' content='text/html; charset=utf-8'/>
  <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=yes'>
  <meta name='format-detection' content='telephone=no'/>

  <title>Olli's Lab</title>
  <script src="_assets/js/kickstart/html5shiv.js"></script>
  <script src="_assets/js/esential/webfontloader.js"></script>
  <script src="_assets/js/esential/modernizr-custom.js"></script>
  <link rel="stylesheet" type="text/css" href="css/page.css">
  <style type="text/css">
  <!--
  .content {
    background:#FFF;
    overflow:auto;
  }
  .content section
  {
    width:100%;
    max-width:80em;
    margin: 1.5em auto;
  }
  .content section + section
  {
    margin-top: 0;
  }

  .test {
    font-size:2em;
  }

  .test:hover {
    color:#f00;
  }
  .header {
  }
  -->
  </style>
</head>

<body class='page'>
<?php echo pageheader();?>
    <div class='page-row page-row-expanded content'>
    <article>
    <h1>Ollis Seite</h1>
    <div id='debug'>test</div>
    <svg style="fill:#fff;height:3em;width:10em" role="img"><use xlink:href="img/svg/icons.svg#icon-labtext"></use></svg>
    <p>some text</p>
    <p>some text</p>
    <span class='test'>Hover Span</span>
    <p style='margin-top:12px;'>some text</p>
    <h1>Ollis Section 2</h1>
    <div id='debug'>test</div>
    <svg style="fill:#fff;height:3em;width:10em" role="img"><use xlink:href="img/svg/icons.svg#icon-labtext"></use></svg>
    <p>some text</p>
    <span class='test'>Hover Span</span>
    <p style='margin-top:12px;'>some text</p>
    </article>
    </div>

<footer class='footer page-row'><ul><li>Made with care by Olli</li><li>&copy; 2014 by Oliver Jean Eifler</li></ul></footer>
<script src="_assets/js/jquery/jquery-1.11.1.js"></script>
<script src="_assets/js/jquery/jquery.onfontresize.js"></script>
<script src="_assets/js/components/velocity.js"></script>
<script src="_assets/js/olli/olli.js"></script>
<script>


var _oldzoom = 1.0;
if (checkBrowser())
{
    $(document).ready(onReady);
}
function checkBrowser()
{
   return (Modernizr.csstransforms && (Modernizr.flexbox ||Modernizr.flexboxlegacy || Modernizr.flexboxtweener));
}
function initHeader()
{
   //$('header').removeClass('text-center').find(".header-cell").addClass("noflow").removeClass("hidden");
   $('header').removeClass('text-center').addClass("noflow");
    /* use Anim */
   //$('header').find(".header-bar").css({"opacity":0});
   /*
   $('#contactopen').on("click.bar",function(e) {toggleBar($("#contactbar"));});
   $('#contactclose').on("click.bar",function(e) {toggleBar($("#contactbar"));});
   $('#searchopen').on("click.bar",function(e) {toggleBar($("#searchbar"));});
   $('#searchclose').on("click.bar",function(e) {toggleBar($("#searchbar"));});
   */
   $('header').on('click.toggle','button[toggle]',function(e) {
        var $this = $(this),id = $this.attr('toggle');
        if (id !== undefined)
            $(id).toggleClass("hidden");
           })
}
function toggleBar($bar)
{
    $bar.toggleClass("hidden");
    return;
 /* use Anim */
 var fadein = {
   options: {
        duration:250,
        easing: "linear",
        begin:function(){$bar.removeClass("hidden")},
        complete:function(){fadeHamburger(false);}
   },
   anim: {
     opacity: [1,0]
   }
  };
  var fadeout = {
   options: {
        duration:250,
        easing: "linear",
        complete:function(){$bar.addClass("hidden");fadeHamburger(true);}
   },
   anim: {
     opacity: [0,1]
   }
  };
  if ($bar.hasClass("hidden"))
    $bar.velocity(fadein.anim,fadein.options);
  else
    $bar.velocity(fadeout.anim,fadeout.options);
}

function fadeHamburger(bIn)
{
  var fadein = {
   options: {
        duration:250,
        delay:250,
        easing: "linear"
   },
   anim: {
     opacity: [1,0]
   }
  };
  var fadeout = {
   options: {
        duration:0,
        easing: "linear"
   },
   anim: {
     opacity: [0,1]
   }
  };
  if (bIn === true)
    $("#hcx").velocity(fadein.anim,fadein.options);
  else
    $("#hcx").velocity(fadeout.anim,fadeout.options);
}
function fitHeader()
{
    var $x = $('#hcx'),
        $a = $('#hc0'),
        $b = $('#hc1'),
        $c0 = $('#hc2'),$c1 = $('#contact'),
        $d0 = $('#hc3'),$d1 = $('#search'),
        $c = $c0,$d=$d0,$cx=$c1,$dx=$d1;
    //Reset
    var zoom=1.0;width = rwidth($('header')[0],true);
    if (width < 420)
        zoom = Math.round(width/420*100)/100;
    if (_oldzoom != zoom)
    {
        _oldzoom = zoom;
        $("header").css({fontSize:""+zoom+"em"});
        width = rwidth($('header')[0],true);

    }



    var xw = rwidth($x[0]),
        aw = rwidth($a[0]),
        bw = rwidth($b[0]),
        c0w = rwidth($c0[0]),
        d0w = rwidth($d0[0]),
        c1w = rwidth($c1[0]),
        d1w = rwidth($d1[0]),
        cw = c0w,dw=d0w,
        space = xw;

    //Logo Left
    $x.css({'left:':0});
    $a.css({'left':xw});

    if (xw + aw + bw + c0w + d0w <= width)
    {
      $x.addClass("hidden");
      $b.removeClass("hidden").css({'left':xw+aw});
    }
    else
    {
      $x.removeClass("hidden");
      $b.addClass("hidden").css({'left':0});
    }
    if (xw+aw+c0w+d0w <=width)
    {
      $d1.addClass("hidden").css({'right':0});
      $d0.removeClass("hidden").css({'right':0});
      $d =$d0;
      dw = d0w;
    }
    else
    {
      $d0.addClass("hidden").css({'right':0});
      $d1.removeClass("hidden").css({'right':0});
      $d =$d1;
      dw = d1w;
    }
    if (xw+aw+c0w+dw <=width)
    {
      $c1.addClass("hidden").css({'right':0});
      $c0.removeClass("hidden").css({'right':dw});
      $c =$c0;
      cw = c0w;
    }
    else
    {
      $c0.addClass("hidden").css({'right':0});
      $c1.removeClass("hidden").css({'right':dw});
      $c =$c1;
      $cx = $c0;
      cw = c1w;
    }

    function rwidth(e,down)
    {
        var fx = (down === true) ? Math.floor:Math.ceil,
        rect = e.getBoundingClientRect();
        //return ((typeof rect.width !== "undefined") ? rect.width:(rect.right - rect.left));
        return fx((typeof rect.width !== "undefined") ? rect.width:(rect.right - rect.left));
    }
}
function fitPage()
{
    var $header = $("header"),
        $footer = $("footer"),
        $body = $("body"),
        $page = $("#page"),
        $content = $("#content");
        $page.css({height:"auto"});
        var height = $body.innerHeight()-$header.innerHeight()-$footer.innerHeight();
        if ($page.innerHeight() < height)
        {
            console.log("flexbox not working");
            height = Math.max(height,$content.innerHeight());
            $page.css({height:height});
        }
}
function onReady()
{
  initHeader();

  onResize();

    WebFont.load({
        custom: {
            families: ['ollicon','roboto_condensed','droid_serif:n4,n7,i4,i7']
        },
        fontactive: function(familyName, fvd) {console.log("font: "+familyName+":"+fvd+" loaded..");onResize();}
  });
  $(window).resize(onResize);
  $(document).on("fontresize",onResize);

}
function onResize()
{
  fitHeader();
  //fitPage();
}

</script>
</body>
</html>