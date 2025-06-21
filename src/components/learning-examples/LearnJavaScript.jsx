const Person={
    name: 'Ashwin',
    address: {
        Line1 : 'BTM LAYOUT',
        City: 'Bangalore',
        Country: 'India',
    },
    profiles:['twitter','instagram','facebook'],

    printProfile: () => {
        Person.profiles.map(
            profile => console.log(profile)
        ) 
    }
}


export default function LearnJavaScript(){
    return(
        <>
        <div>{Person.name}</div>
        <div>{Person.address.City}</div>
        <div>{Person.profiles[1]}</div>
        <div>{Person.printProfile()}</div>
        </>
    )
}