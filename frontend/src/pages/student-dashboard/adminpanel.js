export function Dashboard() {
  const [myMajors, setMyMajors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/faculties/1") // this is only to cxheck thaat we are connected to the data base
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setDataIsLoaded(true);
      });
  }, []);

  return <>
    <div className="container">
      <div className="row">
        
      </div>
    </div>
  </>
}