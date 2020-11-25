import React, {Fragment} from 'react'
import SelfDelOk from './SelfDelOk'
import './Modal.css'
import Calendar from 'react-calendar';
import axios from 'axios'


export default class SelfDeliverModal extends React.Component{

    state = {
        date: new Date(),
        isOpen: false,
        isCalendar: false,
        valueDate: '',
        days: {
            Jan: '01',
            Feb: '02',
            Mar: '03', 
            Apr: '04', 
            May: '05', 
            Jun: '06', 
            Jul: '07', 
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
        },
        name: '',
    };

    handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
    }


    send_data() {
        let body = {data: [
                 document.querySelector('#fio_inp').value,
                 document.querySelector('#chto_budet_zaberat').value, 
                 document.querySelector('#samov').value]}
                 console.log(body)
                    axios({
                        method: 'post',
                        url: 'http://194.242.121.124:4000/send_feedback_for_save_data',
                        data: body
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        this.setState({isOpen: false})
    }



    // onChange = date => 


    onChange = (date) => {
        let mounts = {
            "Jan":"января",
            "Feb":"февраля",
            "Mar":"марта",
            "Apr":"апреля",
            "May":"мая",
            "Jun":"июня",
            "Jul":"июля",
            "Aug":"августа",
            "Sep":"сентября",
            "Oct":"октября",
            "Nov":"ноября",
            "Dec":"декабря",
        }
        this.setState({ date })
        this.setState({ isCalendar: false})
        this.setState({ valueDate: `${date.toString().split(' ')[2]} ${mounts[date.toString().split(' ')[1]]} ${date.toString().split(' ')[3]} `})

       console.log(date.toString().split(' '));     
    }

    render() {
        return (
            <Fragment>
                <button className='modBtn' onClick={() => this.setState({isOpen: true})} > Самовывоз </button>
                {this.state.isOpen && <div className='modal'>
                    <div className='modal-body'>
                        <h1 className='modHead' >Самовывоз</h1>
                        <form className='SelfDeliverForm'>
                          <h1 className="text">Кто будет забирать </h1> <br />
                            {/* eslint-disable-next-line no-restricted-globals */}
                            <input type='text' className='modInput' placeholder='ФИО' id='fio_inp' /><br />
                            <h1 className="text">Что будет забирать </h1> <br />
                            <input type='text' className='modInput' id='chto_budet_zaberat' value={this.props.name} /><br />
                            <h1 className="text">Дата самовывоза</h1> <br />
                            <div>
                                { this.state.isCalendar && <Calendar 
                            className='calendar'
                            onChange={this.onChange}
                            value={this.state.date}
                            />}
                            <input type='text' id='samov' onClick={()=>this.setState({ isCalendar: true})} value={this.state.valueDate} className='modInput' placeholder={'12 ноября 2020, 15:15'} /><br />
                            </div>
                        </form>
                        <div className='acceptBtn'>
                        <SelfDelOk date={this.state.valueDate} closedWindow={() => this.send_data()} />
                        </div>
                    </div>
                </div>}
            </Fragment>
        )
    }

}
