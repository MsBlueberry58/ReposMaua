import cv2
import mediapipe as mp

# Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# Image
a = "hitfilm/IMG_20210512_160934.jpg"
image = cv2.imread("person.jpg")
image = cv2.imread(a)
height, width, _ = image.shape
print("Height, width", height, width)
rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Facial landmarks
result = face_mesh.process(rgb_image)

for facial_landmarks in result.multi_face_landmarks:
    for i in range(0, 468):
        pt1 = facial_landmarks.landmark[i]
        x = int(pt1.x * width)
        y = int(pt1.y * height)

        cv2.circle(image, (x, y), 5, (100, 100, 0), -1)
        #cv2.putText(image, str(i), (x, y), 0, 1, (0, 0, 0))
cv2.imwrite("cover.jpg", image)

cv2.imshow("Image", image)
cv2.waitKey(0)
