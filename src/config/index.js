export default {
  /**
   * @description Configuration is displayed in the browser title tags
   */
  title: 'DBmoitor database monitoring platform',
  /**
   * @description token the number of days stored in the Cookie, the default 1 day
   */
  cookieExpires: 1,
  /**
   * @description Whether to use internationalization, by default false
   *              If you don't use, you will need to show needs in the menu in routing routing setting meta: {title: 'xxx'}
   *              Used to display text in a menu
   */
  useI18n: false,
  /**
   * @description api Request basis path
   */
  baseUrl: {
    // dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    dev: 'http://172.23.162.119:8000/',
    pro: 'http://192.168.48.51:8000/'
  },
  /**
   * @description The default name to open the first page of value, the default for the home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    // 'error-store': {
    //   showInHeader: false, // Set to false logo will not be shown at the top after error log
    //   developmentOff: false // Set to true after won't collect error information in the development environment, convenient development error screen
    // }
  }
}
