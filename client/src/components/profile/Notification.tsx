import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

const Notification = () => {
    const timeAgo = new TimeAgo('en-US')
    const ago = timeAgo.format(new Date('2022-06-26T11:18:56.538Z'))
    return (
        <>
            <div className="modal fade" id="modalPush" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true" style={{ height: '75vh' }}>
                <div className="modal-dialog modal-notify modal-info" role="document">

                    <div className="modal-content">

                        <div className="modal-header d-flex">
                            <h5 className="modal-title" id="staticBackdropLabel1">Notifications</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <div><i className='fas fa-bell fa-4x'></i></div>
                                <h5>No Notifications</h5>
                            </div>
                            {/* <div className="list-group">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small>{ago}</small>
                                    </div>
                                    <p className="mb-1">Some placeholder content in a paragraph.</p>
                                    <small>And some small print.</small>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small className="text-muted">3 days ago</small>
                                    </div>
                                    <p className="mb-1">Some placeholder content in a paragraph.</p>
                                    <small className="text-muted">And some muted small print.</small>
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
