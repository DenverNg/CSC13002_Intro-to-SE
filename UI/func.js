document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.sidebar-links li');
    const contentSections = document.querySelectorAll('.content');

    if (listItems.length > 0) {
      listItems[0].classList.add('active');
      contentSections[0].classList.add('active');
      listItems.forEach(listItem => {
        listItem.addEventListener('click', () => {
          listItems.forEach(item => item.classList.remove('active'));
          listItem.classList.add('active');
          const contentId = listItem.dataset.content;
               const activeContent = document.getElementById(contentId);
         
               if (activeContent) {
                 contentSections.forEach(section => section.classList.remove('active'));
                 activeContent.classList.add('active');
               }
        });
      });
    } else {
      console.error('No list items found with the class "sidebar-links li"');
    }


    const sidebar = document.querySelector('.sidebar');
    const mainToggle = document.querySelector('.main');

    sidebar.addEventListener('mouseover', () => {
    mainToggle.classList.add('active');
  });

    sidebar.addEventListener('mouseout', () => {
    mainToggle.classList.remove('active');
    });
  

  /*--chart--*/
 
const ctx1 = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('earning').getContext('2d');

const trafficData = {
  labels: ['Facebook', 'Youtube', 'Amazon'],
  datasets: [{
    label: 'Traffic Source',
    data: [1100, 1500, 2205],
    backgroundColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)'
    ]
  }]
};

const earningData = {
  labels: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
  datasets: [{
    label: 'Earning',
    data: [4500, 4106, 7005, 6754, 5154, 4554, 7815],
    backgroundColor: 'rgba(79,235,120, 1)',
    borderColor: 'rgba(79,235,120, 1)',
    pointRadius: 6,
    pointHoverRadius: 8,
    pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
    pointHoverBorderColor: 'rgba(255, 206, 86, 1)',
    lineTension: 0.05
    },
    {
    label: 'Withdraw',
    data: [1254, 3215, 8452, 204, 257, 6740, 1000],
    backgroundColor: 'rgba(255, 99, 132, 1)',
    borderColor: 'rgba(255, 99, 132, 1)',
    pointRadius: 6,
    pointHoverRadius: 8,
    pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
    pointHoverBorderColor: 'rgba(255, 206, 86, 1)',
    lineTension: 0.05 
    }
  ]
};

const trafficChart = new Chart(ctx1, {
  type: 'doughnut',
  data: trafficData,
  options: {
  responsive: true
  }
});

const earningChart = new Chart(ctx2, {
  type: 'line',
  data: earningData,
  options: {
  }
});

}); 

