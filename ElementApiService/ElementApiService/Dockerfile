﻿FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV ASPNETCORE_ENVIRONMENT=Development

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ElementApiService/ElementApiService.csproj", "ElementApiService/"]
RUN dotnet restore "ElementApiService/ElementApiService.csproj"
COPY . .
WORKDIR "/src/ElementApiService"
RUN dotnet build "ElementApiService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ElementApiService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ElementApiService.dll"]
