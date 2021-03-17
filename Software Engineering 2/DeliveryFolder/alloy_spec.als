open util/integer

enum Name{ john, nick, paul, sam, mike, mark, nike}
enum State {Milan, Pavia, Centrale, Dergano}

abstract sig Position{}
abstract sig TicketStatus{}

//status of the tickets after scanning
one sig Scanned extends TicketStatus{}

//status of the ticket after booking
one sig Booked extends TicketStatus{}

//cutomer related data with unique id 
sig Customer{
	id: one Int,
	name: disj Name,
	ticket: one Ticket
}
{
id>0
}

// float value for precision while  calculating latitude and longitude
sig Float{
beforePoint: one Int,
afterPoint: one Int
}
 {
afterPoint>0
}

//gps position to know location of store and calculate distance
sig GPSPosition extends Position{
	latitude: one Float,
	longitude: one Float
}
 {
latitude.beforePoint < 90 and latitude.beforePoint > -90
longitude.beforePoint < 180 and longitude.beforePoint > -180
}

//store related general information 
sig Store{
	location: one GPSPosition,
	city: disj State,
	state: disj State,
	currentCustomers: one Int,
	maxCust: one Int,

}

//time to store time of booking
sig Time{
	hours: one Int,
	minutes: one Int,
	seconds: one Int
}
{
	hours>=0
	minutes>0
	seconds>0
}

//ticket related information to store time of booking and status of ticket
sig Ticket{
	id: one Int,
	timeOfRequest: one Time,
	statusOfTicket: one TicketStatus
}
{
id> 0
}

//database to store the customer and ticket data mapped
sig Database {
	row: Customer -> one Ticket
}

//every customer has ticket which is unique from all other tickets in database
fact uniqueTicket{
all disj I, I': Ticket | I.id != I'.id
}

//every customer has id which is unique from all other customers in database
fact uniqueIdPerCustomer{
	all disj c1,c2: Customer | c1.id != c2.id
}

//number of customers is equal to number of tickets
//no two customer ticket ids should match
fact {
#Customer = #Ticket
 all disj c,c': Customer | c.ticket.id != c'.ticket.id 
all disj c,c': Customer, d,d': Database | c.(d.row)  != c'.(d'.row) and c.(d.row) = c.ticket
 
}

//bookticket that add new row to database and update status of new ticket to booked 
pred bookTicket [d, d': Database, c: Customer, t: Ticket]{	
d'.row = d.row + c-> t	
all disj d: Database | c.(d.row) = c.ticket implies c.ticket.statusOfTicket = Booked
}

// delTicket deletes row from the database which contains info related to that customer
pred delTicket [d,d': Database, c: Customer] {
	d'.row = d.row - c->Ticket
}

//showAddedTicket books ticket and shows the booked ticket data
pred showAddedTicket [d,d': Database, c: Customer, t: Ticket] {
	t.statusOfTicket =  Booked
	bookTicket[d, d', c, t]
	#Customer.(d'.row) > 1
}

//bookticket and delete ticket then database should be consitent from before booking and after deleting ticket
assert delUndoesAddedTicket {
	all d,d',d'': Database, c: Customer, t: Ticket |
	no c.(d.row) and bookTicket[d,d',c,t] and delTicket[d',d'',c]
	implies
	d.row = d''.row
}

// after scanning ticket the status of ticket  in database sould change to scanned
pred ScanTicket[c:Customer]{

all disj d: Database | c.(d.row) = c.ticket implies c.ticket.statusOfTicket = Scanned 
}


//run showAddedTicket
//run bookTicket for 10 but exactly 5 Ticket

//run ScanTicket for 6 but exactly 3 Customer 
//check delUndoesAddedTicket

pred show{}

run show
