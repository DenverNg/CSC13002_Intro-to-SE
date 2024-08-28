document.addEventListener('DOMContentLoaded', async() => { 
    // const listItems = document.querySelectorAll('.sidebar-links li');
    // const contentSections = document.querySelectorAll('.content');

    // if (listItems.length > 0) {
    //   listItems[0].classList.add('active');
    //   contentSections[0].classList.add('active');
    //   // listItems.forEach(listItem => {
    //   //   // listItem.addEventListener('click', () => {
    //   //     listItems.forEach(item => item.classList.remove('active'));
    //   //     listItem.classList.add('active');
    //   //     const contentId = listItem.dataset.content;
    //   //          const activeContent = document.getElementById(contentId);
         
    //   //          if (activeContent) {
    //   //            contentSections.forEach(section => section.classList.remove('active'));
    //   //            activeContent.classList.add('active');
    //   //          }
    //   //   //});
    //   // });
    // } else {
    //   console.error('No list items found with the class "sidebar-links li"');
    // }
      // Get the current URL path
  


  const sidebar = document.querySelector('.sidebar');
  const mainToggle = document.querySelector('.main');
  const tabToggle = document.querySelector('.tab-pane');


  sidebar.addEventListener('mouseover', () => {
  mainToggle.classList.add('active');
  //tabToggle.classList.add('active');

});

  sidebar.addEventListener('mouseout', () => {
  // tabToggle.classList.remove('active');
  mainToggle.classList.remove('active');

  });
  

  /*--chart--*/
 
  const ctx1 = document.getElementById('myChart').getContext('2d');
  const ctx2 = document.getElementById('earning').getContext('2d');
  const pieData = {
    labels: ['Không kỳ hạn', 'Kỳ hạn 3 tháng', 'Kỳ hạn 6 tháng', 'Khác'],
    datasets: [{
      label: 'DepositeTerm',
      data: [4500,4500,4500, 4500],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(79,235,120, 1)'
      ]
    }]
  };

  const earningChartData = {
    labels: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
    datasets: [{
      label: 'Số tiền gửi',
      data: earningDataArr,
      backgroundColor: 'rgba(79,235,120, 1)',
      borderColor: 'rgba(79,235,120, 1)',
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
      pointHoverBorderColor: 'rgba(255, 206, 86, 1)',
      lineTension: 0.05
      },
      {
      label: 'Số tiền rút',
      data: withdrawDataArr,
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

  const pieChart = new Chart(ctx1, {
    type: 'doughnut',
    data: pieData,
    options: {
    responsive: true
    }
  });

  const earningChart = new Chart(ctx2, {
    type: 'line',
    data: earningChartData,
    options: {
    }
  });

}); 