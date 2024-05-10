import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# from fastapi.responses import HTMLResponse, JSONResponse
import cv2
import base64
import json
from model import Prediction as p

app = FastAPI()

streaming_enabled = False

async def generate_frames(websocket: WebSocket):
    # OpenCV video capture
    # cap = cv2.VideoCapture(0)  # 0 for default camera
    cap = cv2.VideoCapture('/Users/fasihmuhammad/Desktop/Github/Automated-Car-Data-Validation-and-Tracking/backend/test_images/sample.mp4')
    while streaming_enabled:
        success, frame = cap.read()
        if not success:
            break
        else:
            # Your video processing logic goes here
            # processed_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            processed_frame, accuracy = p.yolo_predictions(frame)
            
            # # Encode processed frame as base64
            _, buffer = cv2.imencode('.jpg', processed_frame)
            frame_bytes = base64.b64encode(buffer.tobytes()).decode('utf-8')

            # Create JSON response with frame information
            json_response = {
                "frame_bytes": frame_bytes,
                "accuracy": accuracy
            }

            try:
                # Send processed frame and JSON response to the client
                await websocket.send_text(json.dumps(json_response))

                # Introduce a small delay to avoid excessive CPU usage
                await asyncio.sleep(0.1)
            except WebSocketDisconnect:
                # If WebSocket is closed while sending, break the loop
                break

@app.websocket("/control_streaming")
async def control_streaming(websocket: WebSocket):
    await websocket.accept()

    global streaming_enabled

    while True:
        data = await websocket.receive_text()
        if data == "start_streaming":
            streaming_enabled = True
            asyncio.create_task(generate_frames(websocket))
        elif data == "stop_streaming":
            streaming_enabled = False


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
