"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { restApi } from "@/api/restApi";

export default function UploadPage() {
  const [source, setSource] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [kind, setKind] = useState<string>("");
  const [license, setLicense] = useState<string>("");
  const [updateFrequency, setUpdateFrequency] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!source || !dataFile || !configFile) return alert("Thiếu thông tin!");

    const formData = new FormData();
    formData.append("source", source);
    formData.append("data", dataFile!);
    formData.append("config", configFile!);
    formData.append("url", url);
    formData.append("kind", kind);
    formData.append("license", license);
    formData.append("update_frequency", updateFrequency);
    formData.append("name", name);

    setUploading(true);
    const res = await restApi.post("upload/data", formData, {
      headers: {"Content-Type": "multipart/form-data"},
    });
    const json = res.data;
    setResult(json);
    setUploading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[url('/background.jpg')] bg-no-repeat bg-center bg-cover">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Tải dữ liệu lên hệ thống</h2>
          <div className="space-y-3">
            <Label htmlFor="data">File dữ liệu (.csv)</Label>
            <Input
              id="data"
              type="file"
              accept=".csv"
              onChange={(e) => setDataFile(e.target.files?.[0] ?? null)}
            />

            <Label htmlFor="config">File cấu hình (.json)</Label>
            <Input
              id="config"
              type="file"
              accept=".json"
              onChange={(e) => setConfigFile(e.target.files?.[0] ?? null)}
            />
            <div className="flex items-center justify-between gap-5">
              <div className="flex flex-col gap-1 flex-1">
                <Label htmlFor="source">Nguồn dữ liệu</Label>
                <Input
                  id="source"
                  placeholder="Nhập nguồn dữ liệu"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <Label htmlFor="name">Tên dữ liệu</Label>
                <Input
                  id="name"
                  placeholder="Nhập tên file dữ liệu..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <div  className="flex flex-col gap-1 flex-1">
                <Label htmlFor="url">Url</Label>
                <Input 
                  id="url"
                  placeholder="Nhập đường dẫn đến nguồn..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div  className="flex flex-col gap-1 flex-1">
                <Label htmlFor="kind">Loại file dữ liệu</Label>
                <Input
                  id="kind"
                  placeholder="Nhập loại file dữ liệu..."
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                />
              </div>
            </div>
            <Label htmlFor="license">Giấy phép</Label>
            <Input
              id="license"
              placeholder="Nhập giấy phép sử dụng dữ liệu..."
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
            <Label htmlFor="updateFrequency">Tần suất cập nhật</Label>
            <Input
              id="updateFrequency"
              placeholder="Nhập tần suất cập nhật dữ liệu..."
              value={updateFrequency}
              onChange={(e) => setUpdateFrequency(e.target.value)}
            />
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full mt-2"
            >
              {uploading ? "Đang tải lên..." : "Tải lên hệ thống"}
            </Button>
          </div>

          {uploading && <Progress value={60} className="mt-2" />}
        </CardContent>
      </Card>
    </div>
  );
}
