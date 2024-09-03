import { Dimensions } from 'react-native';
import { Images } from '../theme';

export interface OtherUseCasesData {
  key: string;
  title: string;
  image: any;
  title_translated: string;
}

export const OTHER_USE_CASES_DATA: OtherUseCasesData[] = [
  {
    key: '1',
    title: 'Video',
    title_translated: 'home.video',
    image: Images.musicIcon
  },
  {
    key: '2',
    title: 'Webview',
    title_translated: 'home.webview',
    image: Images.musicIcon
  },
  {
    key: '3',
    title: 'PDF',
    title_translated: 'home.pdf',
    image: Images.paintIcon
  },
  {
    key: '4',
    title: 'Language',
    title_translated: 'home.language',
    image: Images.languageIcon
  },
  {
    key: '5',
    title: 'HTML',
    title_translated: 'home.html',
    image: Images.languageIcon
  },
  {
    key: '6',
    title: 'Map',
    title_translated: 'home.mapView',
    image: Images.google
  },
  {
    key: '7',
    title: 'ModalCase2',
    title_translated: 'ModalCase2',
    image: Images.mapIcon
  },
  {
    key: '8',
    title: 'ModalCase3',
    title_translated: 'ModalCase3',
    image: Images.google
  }
];

export const STANDARD_SCREEN_SIZE = 812;

export const STANDARD_SCREEN_DIMENSIONS = { height: 812, width: 375 };

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const LOTTIE_JSON_FILES = {
  loaderJson: require('../assets/jsonFiles/loader.json')
};

export const pdfUrl = 'https://www.africau.edu/images/default/sample.pdf';
export const webViewUrl = 'https://www.google.com';
export const videoUrl =
  'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4';

export const testHtml =
  '<body><h1>Jack and the Beanstalk</h1><p>Once upon a time there lived a poor widow and her son Jack. One day, Jack’s mother told him to sell their only cow. Jack went to the market and on the way he met a man who wanted to buy his cow. Jack asked, “What will you give me in return for my cow?” The man answered, “I will give you five magic beans!” Jack took the magic beans and gave the man the cow. But when he reached home, Jack’s mother was very angry. She said, “You fool! He took away your cow and gave you some beans!” She threw the beans out of the window. Jack was very sad and went to sleep without dinner.</p><p></p><p>The next day, when Jack woke up in the morning and looked out of the window, he saw that a huge beanstalk had grown from his magic beans! He climbed up the beanstalk and reached a kingdom in the sky. There lived a giant and his wife. Jack went inside the house and found the giant’s wife in the kitchen. Jack said, “Could you please give me something to eat? I am so hungry!” The kind wife gave him bread and some milk.</p><p></p><p></p><p>Jack and his mother were now very rich and they lived happily ever after.</p></body>';

export const ImageUploaderComponentErrorCode = {
  E_NO_LIBRARY_PERMISSION_KEY: 'E_NO_LIBRARY_PERMISSION',
  E_NO_CAMERA_PERMISSION_KEY: 'E_NO_CAMERA_PERMISSION'
};
