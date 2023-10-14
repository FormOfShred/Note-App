
// for login and register
export default function UserForm() {
    return (
        <div className="container-fluid" style={{maxWidth:"30%"}}>
            <form>
                <div className="mb-3">
                    <input type="text" className="form-control" id="username" placeholder="username"></input>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder="password"></input>
                </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}