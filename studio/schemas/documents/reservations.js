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
      type: 'string',
      title: 'Tent Id'
    },
	{
	  name: 'startDate',
	  type: 'string',
	  title: 'Start Date',
	},
	{
		name: 'endDate',
		type: 'string',
		title: 'End Date'
	}	
  ]
}
