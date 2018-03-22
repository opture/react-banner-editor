Banner = {
  width:'1440px',
  height:'504px',
  startDate:null,
  endDate:null,
  active:false,
  countries,:['default','sv','fi','no'],
  onMobil:true,
  onDesktop:true,
  imageUrl:'',
  videoUrl:'',
  bannerActions:{
    authorized:{
      default:'register'
    },
    unAuthorized:{
      default:'/some-landing-page',
      de:'/de/some-campaign',
      fi:'/fi/some-landing-page',
    }
  },
  elements:[
    {
      type:'text',
      tagname:'h1',
      content:'',
      className:'someClassName',
      style:{
        position:'absolute',
        left:'12.345678%',
        top:'34.2345254%',
      }
    }
  ]
}

//Create specific banner for each device and country.
//banners/mobile/de/_key
//banners/desktop/default/_key
publishedElement = {
  tagname:'',
  visibleTo:'',
  action:'',
  url:'',
  content:'',
  style:{},
}
publishedBanner = {
  imageUrl:'',
  videoUrl:'',
  htmlElements:[]of PublishedElement,
}