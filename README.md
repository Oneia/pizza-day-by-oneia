# pizza-day-by-oneia
Meteor app You can see here https://pizza-day-blanar.herokuapp.com <br>
<h2>App features</h2><br>
1. sign in/sign up<br>
2. Google authentication<br>
3. Create users Groups (so, you don’t need to search for your co workers over whole users list in app).<br>
Only Group creator may invite or remove people. Group should have name, image/logo, menu items that can<br> 
be ordered in this group (made for simplicity, so we avoiding creating of restaurant).<br>
4. Menu item should contain it’s name and price. Any group participant can create menu items or edit existing ones.<br>
5. Group creator is able to add/remove free pizza coupons (each coupon works only for specific pizza (menu item)<br>

6. create new “Pizza day” Event. Event contains event date, event status (ordering/ordered/delivering/delivered),<br>
user’s Group (that takes part in Event). Also, each user from the Group should confirm he is taking part in Event,<br>
so he can add order items in this event.<br>
7. After Event creating each group participant (user) may choose menu items he want to order (+ specify count).
8. When all event participants confirmed their order event status is changing to ordered. So, each user receives<br>
to his email list of items he ordered and total amount $ he should pay to event creator.<br>
9. Event creator receives same email as simple participants + event summary (list menu items he should order<br>
in “Local Restaurant”). After ordering event creator is able to change event status to delivering.<br>

<h2>Technical stack</h2>
1. Meteor<br>
2. Blaze<br>
3. MongoDB<br>
4. server side email notification rendering using some template engine (like handlebars)<br>
5. implement one or more ECMAScript 2015 classes or objects using prototyping<br>
6. ES6
