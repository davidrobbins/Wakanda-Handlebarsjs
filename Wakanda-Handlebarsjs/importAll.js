
ds.Company.remove();
ds.Person.remove();
ds.State.remove();

var folder = ds.getModelFolder();

if (folder != null)
{
	var thePath = folder.path;
	var baseFolder = thePath + 'ImportData/';
	
	
	var file = File(baseFolder + 'States.txt');
	if (ds.State.length == 0) 
	{
		var input = TextStream(file,'read');
		if (!input.end())
		{
			var record = input.read('\r');
			if (record = 'USPS') //verify that the file is in the right format
			{
				while (!input.end())
				{
					record = input.read("\r") //read one row
					if (record != "")
					{
						var newState = new ds.State();
						newState.usps = record;
						newState.save();					
					}
				}
			}
		}
	}
	
	
	var file = File(baseFolder + 'CompanyNames.txt');
	
	if (ds.Company.length == 0)
	{
		
		var input = TextStream(file,'read');
		if (!input.end())
		{
			var record = input.read('\r');
			if (record = 'Company_Name\tCity\tRevenues') //verify that the file is in the right format
			{
				while (!input.end())
				{
					record = input.read("\r").substr(1); //read one row
					if (record != "")
					{
						var columnArray = record.split('\t');
						if (columnArray.length == 3)
						{
							var theName = columnArray[0],
								theCity = columnArray[1],
								theRevenues = columnArray[2];
							
							var newCompany = new ds.Company();
							newCompany.name = theName;
							newCompany.city = theCity;
							newCompany.revenues = theRevenues;
							newCompany.save();
						}
						
					}
				}
			}
			input.close();
		}
	}	
	
	var allCompanies = ds.Company.all();
	
	
	
	var file = File(baseFolder + 'NamesAddressesNumbers.txt');
	
	if (ds.Person.length == 0)
	{
		var input = TextStream(file,'read');
		if (!input.end())
		{
			var record = input.read('\r');
			if (record = 'First\tLast\tAddress\tCity\tState\tZip\tPhone') //verify that the file is in the right format
			{
				while (!input.end())
				{
					record = input.read("\r"); //read one row
					if (record != "")
					{
						var columnArray = record.split('\t');
						if (columnArray.length == 7)
						{
							var randomCompany = allCompanies[Math.round(Math.random() * (allCompanies.length - 1))];
							var theAddress = columnArray[2],
								theCity = columnArray[3];
							
							var nextPart = columnArray[3] + ', ' + columnArray[4] + ' ' + columnArray[5];
							if ((theAddress.length > 0) && (nextPart.length > 3))
								theAddress += '\r' + nextPart;
							var newPerson = new ds.Person({
								city: theCity,
								firstName: columnArray[0].replace(/['"]/g,''),
								lastName: columnArray[1].replace(/['"]/g,''),
								billingAddress: theAddress,
								mailingAddress: theAddress,
								phone: columnArray[6],
								employer: randomCompany
								});
							if (newPerson.lastName != '?')
								newPerson.save();
						}
					}
				}
			}
		input.close();
		}	
	}

	var allPeople = ds.Person.all();
	
	
}
