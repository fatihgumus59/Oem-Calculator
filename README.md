# OEM CALCULATOR

Hi! 
With this calculator, you can calculate the products **automatically**, all you have to do is enter the product **name** and product **price**.


# API

The calculation is done and the total is kept in the background, but for those who want to calculate it **in a different currency**, we pull the exchange rate via an API.
We multiply the incoming data with the total and show it to the user.

To explain visually:

```mermaid
graph LR
S[System]-->A
A[API] --> B((USD))--to-->D((TRY))
S --> C(Total)
D --> E{Total x TRY}
C --> E
E --> F(TOTAL TL)
```

For API: [Documentation](https://www.frankfurter.app/docs/)


## Application Images
![enter image description here](https://i.hizliresim.com/jykd9a8.png)

  ![enter image description here](https://i.hizliresim.com/cfxl497.png)
![enter image description here](https://i.hizliresim.com/9c26uhd.png)
![enter image description here](https://i.hizliresim.com/2bq1i06.png)
![enter image description here](https://i.hizliresim.com/iy4b72v.png)
![enter image description here](https://i.hizliresim.com/alahmsy.png)


## THANKS

This content is a post-training study.
Thanks for viewing.
[Linkedin](https://www.linkedin.com/in/fatihgumus59)
