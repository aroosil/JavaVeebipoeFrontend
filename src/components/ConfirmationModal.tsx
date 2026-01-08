import { Button, Modal } from "react-bootstrap";

function ConfirmationModal(
  description: string,
  confirmFunc: () => void,
  confirmText?: string
) {
  confirmText = confirmText || "Confirm";

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <p>{description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="danger" onClick={confirmFunc}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ConfirmationModal;
