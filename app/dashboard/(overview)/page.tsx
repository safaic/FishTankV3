
import PerameterChart from '@/app/ui/dashboard/peramchart';
import {fetchPerameter} from '@/app/lib/data';


export default async function Home() {
  // const parameter = await fetchPerameter();
  // console.log(parameter);
    return (  

<div>
<PerameterChart   />
  </div>

 


    );
}