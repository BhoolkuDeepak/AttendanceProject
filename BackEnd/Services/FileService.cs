
namespace BackEnd.Services;
using Newtonsoft.Json;
using System;
using System.IO;

public class FileService
{
    public T ReadFromFile<T>(string filePath)
    {
        if (!File.Exists(filePath))
        {
            return Activator.CreateInstance<T>();
        }
        var json = File.ReadAllText(filePath);
        return JsonConvert.DeserializeObject<T>(json) ?? Activator.CreateInstance<T>();
    }

    public void SaveToFile<T>(string filePath, T data)
    {
        var json = JsonConvert.SerializeObject(data, Formatting.Indented);
        File.WriteAllText(filePath, json);
    }
}
