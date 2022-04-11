import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';
import logo from './logo.jpg';

export default function FormData() {
  const [state, setstate] = useState({
    name: '',
    email: '',
    sign: '',
    day: 'today'
  })

 const [nameerr,SeterrName]=useState("");
 const[emailerr,seterrEmail]=useState("");

  const [horoscope, setHoroscope] = useState(" ");
  const [mood, setMood] = useState(" ");
  const [date, setDate] = useState(" ");
  const [signsArr, setSigns] = useState([]);

  useEffect(() => {
    fetch('https://sandipbgt.com/theastrologer/api/sunsigns')
      .then((response) => response.json())
      .then(setSigns)
  }, []);


  const onchange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value
    })

  }

  const getdata = (sign, day, name, email) => 
  {
    if(name=="" || email=="" || sign=="")
    {
    if(name=="")
    {
      SeterrName("Name is required");
    }
    if(email=="")
    {
      seterrEmail("Email is required");
    }
    if (sign === "") {
      setstate({
        ...state,
        sign: "default"
      })
    }

  }

    
    
    else {

      var config = {
        method: 'get',

        url: `http://sandipbgt.com/theastrologer/api/horoscope/${sign}/${day}/`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          // console.log(response.data.meta.mood)
          setHoroscope(response.data.horoscope)
          setMood(response.data.meta.mood);
          setDate(response.data.date);


        })
        .catch(function (error) {
          console.log(error);
        });


    }


  }

  onsubmit = (e) => {

    e.preventDefault();


    getdata(state.sign, state.day, state.name, state.email);


  }

  console.log(state.name)


  return (
    <>

      <Container fluid>

        <Row className="justify-content-md-center" style={{ margin: '100px' }}>
          <Col >
            {mood == " " ? null : <p style={{ fontFamily: "cursive", color: "white" }}><b>Your name:</b>{state.name}<br /><b>Your Mood : </b>{mood}<br/>Date : {date} <br/>Sunsign : {state.sign}</p>}
            {mood == " " ? <h1 style={{ fontFamily: 'cursive', color: 'white', fontSize: '65px' }}>Check Your Horoscope</h1> : <h1 style={{ fontFamily: 'cursive', color: 'white', fontSize: '65px' }}>Your Horoscope</h1>}



            {horoscope == " " ? <img src={logo} /> : <p style={{ fontFamily: "cursive", color: "white" }}>{horoscope}</p>}
          </Col>


          <Col style={{ backgroundColor: '#A569BD ', borderRadius: '60px' }}>

            <h4 style={{ color: "white", fontFamily: 'cursive', margin: '70px' }}>Enter Details</h4>

            <Form style={{ margin: '70px' }} onSubmit={onsubmit} >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label style={{ color: "white" }}>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={onchange} />
                  {emailerr == "" ? null : <span style={{ color: "red" }} >{emailerr}</span>}

                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label style={{ color: "white" }}>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" name="name" onChange={onchange} />
                  {nameerr == "" ? null : <span style={{ color: "red" }} >{nameerr}</span>}

                </Form.Group>
              </Row>



              <Row className="mb-3">


                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label style={{ color: "white" }}>Select SunSign</Form.Label>
                  <Form.Select defaultValue="Choose..." onChange={onchange} name="sign">
                    <option>Select Sign</option>
                    {signsArr.map((sign) => (
                      <option>{sign}</option>
                    ))}

                  </Form.Select>
                  {state.sign == "default" ? <span style={{ color: "red" }}> Please select Sign</span> : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label style={{ color: "white" }}>Select Day</Form.Label>
                  <Form.Select defaultValue="today" onChange={onchange} name="day">
                    <option>today</option>
                    <option>yesterday</option>
                    <option>tomorrow</option>
                  </Form.Select>
                </Form.Group>

                <p></p>

              </Row>



              <Button variant="primary" type="submit" size="lg">
                Submit
              </Button>
            </Form>

          </Col>
        </Row>

      </Container>






    </>

  );

}
