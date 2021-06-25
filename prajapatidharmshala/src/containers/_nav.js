export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'डैशबोर्ड',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Components']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'देखे',
        to: '/charts',
        icon: 'cil-star',
        items: [
          {
            name: 'डोनेशन लिस्ट',
            to: '/dharmashala/donation/list'
          },
          {
            name: 'एक्सपेंस लिस्ट',
            to: '/notifications/alerts'
          },
          {
            name: 'इवेंट लिस्ट',
            to: '/base/formss'
          },
          {
            name: 'यूजर लिस्ट',
            to: '/dharmashala/user/list'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'ऑपेरशन',
        to: '/  ',
        icon: 'cil-star',
        items: [
          {
            name: 'डोनेशन ऐड',
            to: '/dharmashala/donation/add'
          },
          {
            name: 'एक्सपेंस ऐड',
            to: '/pages/login'
          },
          {
            name: 'यूजर ऐड',
            to: '/dharmashala/user/register'
          },
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'रिपोर्ट',
        to: '/charts',
        icon: 'cil-star',
      },
    ]
  }
]