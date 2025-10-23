import cloudinary from "@/utils/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return Response.json(
        { error: "No file uploaded" }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'chat-bot',
    });

    return Response.json({ 
      imageURL: result.secure_url, 
      message: "Upload successful!" 
    });
    
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json(
      { error: "Upload failed", details: error.message }, 
      { status: 500 }
    );
  }
}