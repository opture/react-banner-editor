import firebase from '../__mocks__/firebase'
import { addLandingPage, getLandingPagesSimple, getLandingPagesData, getLandingPageData } from '../landing-pages'

//Add a catgeory
    let testKey = '';

    var testPage = {
      name:'landing test page',
      type:'game',
      games:[
        {
          gameCaption:'',
          launchUrl:'',
          imageUrl:''
        },
      ],
      default:{
        urlFraction:'live-casino',
        desktop:{
          pageHeader:'Live Casino i världsklass',
          pageParagraph: 'Slå dig ner vid något av våra bord och upplev Live Casino utan störande element. Codeta ger dig fullt fokus på spel och spänning. Välkommen att utmana våra dealers!',
          signupHeadeR:'Right now: 100% bonus',
          signupParagraph:'Ta plats vid något av våra spelbord och få en insättningsbonus på 100% upp till 3000kr!'
        },
        mobile:{
          pageHeader:'Live Casino i världsklass',
          pageParagraph: 'Slå dig ner vid något av våra bord och upplev Live Casino utan störande element. Codeta ger dig fullt fokus på spel och spänning. Välkommen att utmana våra dealers!',
          signupHeadeR:'Right now: 100% bonus',
          signupParagraph:'Ta plats vid något av våra spelbord och få en insättningsbonus på 100% upp till 3000kr!'
        },
        games:[
          {gameCaption:''}
        ]
      },
      sv:{
        urlFraction:'live-casino',
        desktop:{
          pageHeader:'Live Casino i världsklass',
          pageParagraph: 'Slå dig ner vid något av våra bord och upplev Live Casino utan störande element. Codeta ger dig fullt fokus på spel och spänning. Välkommen att utmana våra dealers!',
          signupHeadeR:'Right now: 100% bonus',
          signupParagraph:'Ta plats vid något av våra spelbord och få en insättningsbonus på 100% upp till 3000kr!'
        },
        mobile:{
          pageHeader:'Live Casino i världsklass',
          pageParagraph: 'Slå dig ner vid något av våra bord och upplev Live Casino utan störande element. Codeta ger dig fullt fokus på spel och spänning. Välkommen att utmana våra dealers!',
          signupHeadeR:'Right now: 100% bonus',
          signupParagraph:'Ta plats vid något av våra spelbord och få en insättningsbonus på 100% upp till 3000kr!'
        },
        games:[
          {gameCaption:''}
        ]
      }
    }

    var testPage2 = {
      name:'landing test page 2',
      type:'video',
      default:{
        urlFraction:'live-casino',
        desktop:{
          pageHeader:'Live Casino i världsklass',
          pageParagraph: 'Slå dig ner vid något av våra bord och upplev Live Casino utan störande element. Codeta ger dig fullt fokus på spel och spänning. Välkommen att utmana våra dealers!',
          signupHeadeR:'Right now: 100% bonus',
          signupParagraph:'Ta plats vid något av våra spelbord och få en insättningsbonus på 100% upp till 3000kr!'
        },
        mobile:{
          pageHeader:'Live Casino i världsklass',
          pageParagraph: 'Slå dig ner vid något av våra bord och upplev Live Casino utan störande element. Codeta ger dig fullt fokus på spel och spänning. Välkommen att utmana våra dealers!',
          signupHeadeR:'Right now: 100% bonus',
          signupParagraph:'Ta plats vid något av våra spelbord och få en insättningsbonus på 100% upp till 3000kr!'
        },
        videos:[
          {
            youtubeId: 'E0mCX1bHiOs',
            caption:'Codeta HOld\'em Tutorial'
          },
          {
            youtubeId: '22-68IOOy_A',
            caption:'Codeta Roulette Tutorial'
          }
        ],
      },
      sv:{
        urlFraction:'live-casino',
        desktop:{
          pageHeader:'Live Casino i världsklass',
          pageParagraph: 'Slå dig ner vid något av våra bord och upplev Live Casino utan störande element. Codeta ger dig fullt fokus på spel och spänning. Välkommen att utmana våra dealers!',
          signupHeadeR:'Right now: 100% bonus',
          signupParagraph:'Ta plats vid något av våra spelbord och få en insättningsbonus på 100% upp till 3000kr!'
        },
        mobile:{
          pageHeader:'Live Casino i världsklass',
          pageParagraph: 'Slå dig ner vid något av våra bord och upplev Live Casino utan störande element. Codeta ger dig fullt fokus på spel och spänning. Välkommen att utmana våra dealers!',
          signupHeadeR:'Right now: 100% bonus',
          signupParagraph:'Ta plats vid något av våra spelbord och få en insättningsbonus på 100% upp till 3000kr!'
        },
        videos:[
          {
            youtubeId: 'E0mCX1bHiOs',
            caption:'Codeta HOld\'em Tutorial'
          },
          {
            youtubeId: '22-68IOOy_A',
            caption:'Codeta Roulette Tutorial'
          }
        ],
      }
    }

  test('Add a page', () => {

    return addLandingPage(testPage).then( (landingPage) => {
      expect(landingPage).toHaveProperty('_key');
      //expect(landingPage).toHaveProperty('default.mobile.pageHeader');
    }).catch( (err) => {
      fail(err)
    })
  })

  test('Add another page', () => {

    return addLandingPage(testPage2).then( (landingPage) => {
      expect(landingPage).toHaveProperty('_key');
      expect(landingPage).toHaveProperty('default.mobile.pageHeader');
    }).catch( (err) => {
      fail(err)
    })
  })

  test('getLandingPagesSimple', () => {
    return getLandingPagesSimple().then( (data) => {
      testKey = data[0]._key
      expect(data[0]).toHaveProperty('name')
    })
  })


  test('getLandingPagesData', () => {
    return getLandingPagesData().then( (data) => {
      expect(data[0]).toHaveProperty('name')
    })
  })


  test('getLandingPageData', () => {
    return getLandingPageData(testKey).then( (data) => {
      expect(data).toHaveProperty('name')
    })
  })

//Update a category

//Add a game to a catgory

//Fetch a category by language
