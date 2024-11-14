import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Box } from '@mui/material';
import { Star } from '@mui/icons-material';
import p1 from '../../images/p1.webp';
import p2 from '../../images/p2.png';
import p3 from '../../images/p3.webp';

import './Testimonial.css';

const testimonials = [
    {
        img: p2,
        name: 'Mayank Johri',
        review: 'I love the stainless steel pressure cooker from Camro Utensils. It’s durable and easy to clean.'
    },
    {
        img: p1,
        name: 'Anushree Sain',
        review: 'The Triply Pressure Cookers are a game-changer! Cooking is so much faster and efficient now.'
    },
    {
        img: p3,
        name: 'Rahul Sharma',
        review: 'The Triply Kadhai is my favorite cookware. It heats evenly and the food tastes amazing.'
    }
];

const Testimonial = () => {
    return (
        <section className="testimonial my-5">
            <Container>
                <Box textAlign="center" mb={5}>
                <Typography
        style={{
          textAlign: "center",
          color: "rgb(18 80 141)",
          fontFamily: "poppins",
          fontWeight: "600",
          fontSize:'30px'
        }}
        mb={2}>
        <u>Our Happy Client</u>
      </Typography>
                    <Typography variant="h6" color="textSecondary">Here's what our clients have to say about Camro Utensils</Typography>
                </Box>
                <Grid container spacing={4}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Avatar src={testimonial.img} alt="User Image" sx={{ width: 60, height: 60, margin: 'auto' }} />
                                    <Typography variant="h6" component="div">{testimonial.name}</Typography>
                                    <Box display="flex" justifyContent="center" mb={2}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} sx={{ color: '#FFD700' }} />
                                        ))}
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">{testimonial.review}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    );
};

export default Testimonial;
