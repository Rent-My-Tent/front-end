export default {
  name: 'reservation',
  type: 'document',
  title: 'Reservation',
  fields: [
    {
      name: 'email',
      type: 'string',
      title: 'Email'
    },
    {
      name: 'tentId',
      type: 'text',
      title: 'Tent Id'
    },
	{
	  name: 'startDate',
	  type: 'datetime',
	  title: 'Start Date'
	},
	{
		name: 'endDate',
		type: 'datetime',
		title: 'End Date'
	}	
  ]
}
