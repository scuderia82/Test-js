
import React, {useState,useEffect} from 'react';
import ReactPaginate from 'react-paginate';
function Test(){
    useEffect(() => {
        fetchitems(1);
   },[]);
   const [items,setItems] = useState([]); 
   const[pageNum,setPageNum]= useState(1);
   const [loading,setLoading]= useState(true);
   const goNext = () => {
    let pn = pageNum + 1;
    setPageNum(pn);
    fetchitems(pn);
   }
   const goPrev = () => {
    let pn =pageNum -1;
    setPageNum(pn);
    fetchitems(pn);
   }
   window.scrollTo(0, 0)

   const fetchitems = async (pn) => {
       setLoading(true)
       const data = await fetch('https://api.github.com/gists/public?per_page=30&page=' + pn);
       const items = await data.json();
       console.log(items);
       setItems(items); 
       setLoading(false)
   };
    
    if (loading) { 
        return (<p className="loader">Loading...</p>);
    } else {
        return (
          <div>
            <table>
               <tbody>
                { items.map( item => (
                    <tr key={item.id} class="table-row">
                        <td>
                            <img className="styleImage" src={item.owner.avatar_url}  />
                        </td>
                        <td>
                            <p className="styleText">{Object.entries(item.files)[0][1].filename}</p>
                        </td>
                    </tr>
                   
                ))
                }
                </tbody>
            </table>
            <div className="pagination">
                <button className="styleButton" onClick={()=>goPrev()} disabled={ pageNum == 1 }>Previous</button>
                <button className="styleButton" onClick={()=>goNext()}>Next</button>
            </div>
        </div> );
        }
}

export default Test;