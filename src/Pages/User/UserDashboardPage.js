import React, { Component } from "react";
import MainLayout from "../../Components/Layouts/MainLayout";
import Toastr from "../../Utils/Toastr";
import UsersDataService from "../../Components/Services/Users.Service";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data_daily = [
  { name: 'Monday', visitors: 40 },
  { name: 'Tueday', visitors: 30 },
  { name: 'Wednesday', visitors: 20 },
  { name: 'Thursday', visitors: 50 },
  { name: 'Friday', visitors: 18 },
  { name: 'Saturday', visitors: 23 },
  { name: 'Sunday', visitors: 34  },
];

const data_monthly = [
  { name: 'Jan', visitors: 400 },
  { name: 'Feb', visitors: 300 },
  { name: 'Mar', visitors: 200 },
  { name: 'Apr', visitors: 270 },
  { name: 'May', visitors: 180 },
  { name: 'Jun', visitors: 230 },
  { name: 'Jul', visitors: 340 },
  { name: 'Aug', visitors: 500 },
  { name: 'Sep', visitors: 300 },
  { name: 'Oct', visitors: 405 },
  { name: 'Nov', visitors: 280 },
  { name: 'Dec', visitors: 400 },
];

const data_yearly = [
  { name: '2015', visitors: 4000 },
  { name: '2016', visitors: 3000 },
  { name: '2017', visitors: 2000 },
  { name: '2018', visitors: 2780 },
  { name: '2019', visitors: 1890 },
  { name: '2020', visitors: 2390 },
  { name: '2021', visitors: 3490 },
  { name: '2022', visitors: 5060 },
  { name: '2023', visitors: 3210 },
  { name: '2024', visitors: 6000 },
];
export default class UserDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.getDashBoardData = this.getDashBoardData.bind(this);
  }

  componentDidMount() {
    //this.getDashBoardData();
  }

  getDashBoardData = async() => {
    this.setState({ loading: true });
    let dateStr = new Date().getTime();
    var dt = new Date(dateStr);
    dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    let today = dt.getFullYear() + "-" + (1 + dt.getMonth()).toString().padStart(2, '0') + "-" + dt.getDate().toString().padStart(2, '0')

    dt = new Date(dt.getTime() - (dt.getDay() > 0 ? (dt.getDay() - 1) * 1000 * 60 * 60 * 24 : 6 * 1000 * 60 * 60 * 24));
    let start = dt;
    let end = new Date(dt.getTime() + 1000 * 60 * 60 * 24 * 7 - 1)
    let weekStart = start.getFullYear() + "-" + (1 + start.getMonth()).toString().padStart(2, '0') + "-" + start.getDate().toString().padStart(2, '0')
    let weekEnd = end.getFullYear() + "-" + (1 + end.getMonth()).toString().padStart(2, '0') + "-" + end.getDate().toString().padStart(2, '0')

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dateStr = new Date();
    let monthName = monthNames[dateStr.getMonth()];
    var date = new Date(Date.parse(monthName + 1, new Date().getFullYear()));
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var month = new Date(Date.parse(monthName + 1, new Date().getFullYear())).getMonth()+1;
    var year = new Date().getFullYear();

    var data = {
      today: today,
      weekStart: weekStart,
      weekEnd: weekEnd,
      monthStart: year + "-" + month.toString().padStart(2, '0') + "-" + firstDay.toString().padStart(2, '0'),
      monthEnd: year + "-" + month.toString().padStart(2, '0') + "-" + lastDay.toString().padStart(2, '0'),
      yearStart:  year + "-" + '01' + "-" + '01',
      yearEnd: year + "-" + '12' + "-" + '31',
      unitId: localStorage.getItem('unitid'),
    };
    await UsersDataService.getDashBoardData(data)
      .then(response => {
        response.data.map((token, index) => {
          response.data[index].countAllThisYear = token.countAllThisYear.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumAllThisYear = token.sumAllThisYear.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countAllThisMonth = token.countAllThisMonth.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumAllThisMonth = token.sumAllThisMonth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countAllThisWeek = token.countAllThisWeek.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumAllThisWeek = token.sumAllThisWeek.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countAllToday = token.countAllToday.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumAllToday = token.sumAllToday.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
		
          response.data[index].countPendingThisYear = token.countPendingThisYear.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumPendingThisYear = token.sumPendingThisYear.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countPendingThisMonth = token.countPendingThisMonth.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumPendingThisMonth = token.sumPendingThisMonth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countPendingThisWeek = token.countPendingThisWeek.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumPendingThisWeek = token.sumPendingThisWeek.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countPendingToday = token.countPendingToday.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumPendingToday = token.sumPendingToday.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
		
          response.data[index].countApprovedThisYear = token.countApprovedThisYear.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumApprovedThisYear = token.sumApprovedThisYear.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countApprovedThisMonth = token.countApprovedThisMonth.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumApprovedThisMonth = token.sumApprovedThisMonth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countApprovedThisWeek = token.countApprovedThisWeek.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumApprovedThisWeek = token.sumApprovedThisWeek.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countApprovedToday = token.countApprovedToday.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumApprovedToday = token.sumApprovedToday.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
		
          response.data[index].countQueriedThisYear = token.countQueriedThisYear.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumQueriedThisYear = token.sumQueriedThisYear.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countQueriedToday = token.countQueriedToday.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumQueriedToday = token.sumQueriedToday.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countQueriedThisWeek = token.countQueriedThisWeek.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumQueriedThisWeek = token.sumQueriedThisWeek.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].countQueriedThisMonth = token.countQueriedThisMonth.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          response.data[index].sumQueriedThisMonth = token.sumQueriedThisMonth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

        })
        this.setState({list: response.data})
      })
      .catch(() => {
        Toastr(
          "error",
          "Error fetching Dashboard Data"
        );
        this.setState({ loading: false });
      });
      
  };

  render() {
    const { list } = this.state;
    
      return (
        <MainLayout
          role="user"
          title={'Hello ' + localStorage.getItem('username')}
          subtitle="The graphic representation of your company's visitors"
        >
          <ResponsiveContainer width="80%" height={170}>
            <h5>Daily</h5>
            <BarChart
              data={data_daily}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="Purple" />
            </BarChart>
            <h5>Monthly</h5>
            <BarChart
              data={data_monthly}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="Green" />
            </BarChart>
            <h5>Yearly</h5>
            <BarChart
              data={data_yearly}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="Blue" />
            </BarChart>
          </ResponsiveContainer>
        </MainLayout>
      );
  }
}
